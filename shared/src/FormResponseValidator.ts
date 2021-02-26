/**
 * Validator for SDCFormResponse
 * For front end text field formate validation, use classMeta.textFieldTypeMeta.validator
 */

import { ValidationError, AnswerValidationError } from "./Utils"
import * as Model from "./ClassDef"
import { classMeta } from "./ClassMeta"
import { textFieldTypeMeta } from "./TextFieldTypeMeta"
import { GenericClassValidator } from "./ClassValidator"
import { resourceUsage } from "process"

/** Contains flags that can change the behaviour of the recursive validation process */
class ValidationFlag{
     /**
      * A map from UID to field names \
      * Validation will be skipped for all field names for object with that UID
      */
     byPassUIDField: { [uid : string] : [string] } = {}

     /**
      * Mark the uid and field to be by passed
      * @param uid 
      * @param field 
      */
     addByPassUIDField(uid: string, field: string){
          // TODO
          this.byPassUIDField[uid] = [field];
     }
}

// For front end text field formate validation, use classMeta.textFieldTypeMeta.validator
export class FormResponseValidator {

     protected errors: AnswerValidationError[] = []
     protected answers: Model.SDCAnswer[]
     protected validatedAnswers: Model.SDCAnswer[] = []
     protected validationFlag: ValidationFlag = new ValidationFlag()
     
     protected constructor(response: Model.SDCFormResponse){
          this.answers = response.answers
     }

     /**
      * Validate a form response, return a list of validation errors on all question\
      * If there is no error, unvalidated answers will be removed for submission\
      * None AnswerValidationError will be thrown immediately
      * @param response form response to validate
      * @param form form corresponded to the response
      */
     static validate(response: Model.SDCFormResponse, form: Model.SDCForm): AnswerValidationError[]{
          // Object validity check
          GenericClassValidator.validate(response)
          GenericClassValidator.validate(form)
          
          // Response check
          const validator = new this(response)
          validator.validateNode(form)
          
          // All questions that are unchecked should be removed
          if (validator.errors.length == 0){
               response.answers = validator.validatedAnswers
          }

          return validator.errors
     }

     /**
      * Find answer to the provided question by questionID\
      * Throws error if no answer or multiple answers are provided
      * @param question question to look for
      */
     protected findAnswer(question: Model.SDCQuestion): Model.SDCAnswer{
          const answers = this.answers.filter( answers => answers.questionID === question.id )
          if (answers.length === 0) {
                // ValidationError is considered as fatal error
               throw new ValidationError("SDCAnswer not found for question " + question.id)
          } else if (answers.length > 1) {
               throw new ValidationError("Multiple answers to the same question")
          }
          return answers[0]
     }

     /**
      * Check to see if a valid answer to a text field is provided
      * @param question a list field
      */
     protected validateTextField(question: Model.SDCTextField){
          const answer = this.findAnswer(question)
          if (answer.responses.length === 0) {
               this.errors.push(new AnswerValidationError(question, "Question must be answered"))
               return
          } else if (answer.responses.length > 1){
               // Fatal error
               throw new ValidationError("Multiple responses submitted for question " + question.id)
          } else if (!textFieldTypeMeta[question.type] || !textFieldTypeMeta[question.type].parser) {
               // Parser unavailable
               throw new ValidationError("Parser is not available for object of type " + question.type);
          }
          const theAnswer = answer.responses[0];
          const result = textFieldTypeMeta[question.type].parser!(answer.responses[0]); // ! operator because we are already checking above whether or not a parser exists.
          if (!result) {
               this.errors.push(new AnswerValidationError(question, "Answer is formatted incorrectly."));
          }
          return;
     }

     /**
      * Check to see if a valid answer to a list field is provided
      * @param question a list field
      */
     protected validateListField(question: Model.SDCListField){
          const answer = this.findAnswer(question)

          // Check for out-of-bounds.
          if (answer.responses.length > question.maxSelections) {
               this.errors.push(new AnswerValidationError(question, "Selection count above maximum."))
          } else if (answer.responses.length < question.minSelections) {
               this.errors.push(new AnswerValidationError(question, "Selection count below minimum."))
          }
          // Check for validity of ids.
          let idCheck = answer.responses.every(response => {
               // Assuming I should be checking listFieldItem.id. Might need to change?
               question.options.some(listFieldItem => listFieldItem.id === response);
          });
          if (!idCheck) {
               throw new ValidationError("Invalid ID provided for question " + question.id);
          }
          // selectionDeselectsSiblings and selectionDisablesChildren checks
          for (let response of answer.responses) {
               for (let option of question.options) {
                    if (response === option.id) {
                         if (option.selectionDeselectsSiblings && answer.responses.length > 1) {
                              this.errors.push(new AnswerValidationError(question, "Multiple selections while selectionDeselectsSiblings enabled on response " + response));
                         }
                         if (option.selectionDisablesChildren) {
                              // Can we assume uid is non-null? Forcing it with ! operator here.
                              this.validationFlag.addByPassUIDField(option.uid!, 'children');
                         }
                    }
               }
               let filteredItems = question.options.filter(listFieldItem => {
                    if (listFieldItem.id === response) {
                         return true;
                    }
                    return false;
               })
          }

          for (let option of question.options) {
               let exists = answer.responses.filter(response => {
                    if (option.id === response) {
                         return true;
                    }
               })
               if (!exists) {
                    this.validationFlag.addByPassUIDField(option.uid, 'textResponse');
               }
          }
          
          // for (let response of answer.responses) {
          //      // ID validity check
          //      let idCheck = false;
          //      for (let option of question.options) {
          //           if (option.id === response) {
          //                idCheck = true;
          //           }
          //      }
          // }

     }

     /**
      * Perform validation on a question
      * @param obj Object to validate
      */
     protected validateNode(obj: any){
          if (obj instanceof Model.SDCTextField) {
               this.validateTextField(obj)
          } else if (obj instanceof Model.SDCListField) {
               this.validateListField(obj)
          }
          this.validateChildren(obj)
     }

     /**
      * Recursively validate the form and call `validateNode` on each attribute
      * @param obj Object to validate
      * @param targetClassName use the validation logic of this class
      */
     protected validateChildren(obj: any, targetClassName?: string){

          if (targetClassName == null) targetClassName = obj.constructor.name
          if (targetClassName == null || classMeta[targetClassName] == null) return
          const targetClass = classMeta[targetClassName]
          
          if (targetClass.super) this.validateChildren(obj, targetClass.super.name)

          for (let [id, targetField] of Object.entries(targetClass.fields)){
               const field = obj[id]
               if (field == null) continue

               // FormResponseValidator By Pass Logic
               if (obj.uid){
                    const byPassList = this.validationFlag.byPassUIDField[obj.uid]
                    if (byPassList && byPassList.indexOf(id) >= 0) continue
               }
               
               if (targetField.generic) {
                    if (targetField.type === Array) {
                         (field as Array<any>).map(
                              o => { return this.validateNode(o) }
                         )
                    } else if (targetField.type === Object) {
                         this.validateNode(field)
                    }
               }
          }
     }
}
