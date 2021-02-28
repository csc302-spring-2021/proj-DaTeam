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
          if (typeof this.byPassUIDField[uid] != 'undefined' && this.byPassUIDField[uid] instanceof Array) {
               this.byPassUIDField[uid].push(field);
          } else {
               this.byPassUIDField[uid] = [field];
          }
                                                
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
          } else if (typeof textFieldTypeMeta[question.type].parser == 'undefined' || typeof textFieldTypeMeta[question.type].parser != 'function') {
               // Parser unavailable
               throw new ValidationError("Parser is not available for object of type " + question.type);
          }
          const result = textFieldTypeMeta[question.type].parser!(answer.responses[0]); // ! operator because we are already checking above whether or not a parser exists.
          if (result) {
               this.validatedAnswers.push(answer);
          } else {
               this.errors.push(new AnswerValidationError(question, "Answer for question " + question.id + " is formatted incorrectly."));
          }
          return;
     }

     /**
      * Check to see if a valid answer to a list field is provided
      * @param question a list field
      */
     protected validateListField(question: Model.SDCListField){
          const answer = this.findAnswer(question)
          let valid = true;
          // Check for out-of-bounds.
          // Do we throw or return here?
          if (answer.responses.length > question.maxSelections) {
               this.errors.push(new AnswerValidationError(question, "Selection count above maximum."));
               valid = false;
               //throw new ValidationError("Selection count above maximum.");
          } else if (answer.responses.length < question.minSelections) {
               this.errors.push(new AnswerValidationError(question, "Selection count below minimum."));
               valid = false;
               //throw new ValidationError("Selection count below minimum.");
          }

          // Check for validity of ids.
          let idCheck = answer.responses.every(response => {
               // Assuming I should be checking listFieldItem.id. Should it be id or uid?
               question.options.some(listFieldItem => listFieldItem.id === response);
          });
          if (!idCheck) {
               throw new ValidationError("Response with invalid ID selected for question " + question.id);
          }

          // Filtering out unselected options, and checking validity along the way
          let selectedListFieldItems: Model.SDCListFieldItem[] = question.options.filter(listFieldItem => {
               for (let response in answer.responses) {
                    if (response === listFieldItem.id) {
                         // Check for selectionDeselectsSiblings
                         if (listFieldItem.selectionDeselectsSiblings && answer.responses.length > 1) {
                              this.errors.push(new AnswerValidationError(question, "Multiple selections while selectionDeselectsSiblings is enabled on response " + response));
                              valid = false;
                         }
                         
                         // Check for selectionDisablesChildren
                         if (listFieldItem.selectionDisablesChildren) {
                              if (typeof listFieldItem.uid != "undefined" && typeof listFieldItem.uid == "string") {
                                   this.validationFlag.addByPassUIDField(listFieldItem.uid!, 'children');
                              } else {
                                   throw new ValidationError("UID not found for item " + response);
                              }
                         }
                         return true;
                    }
               }
               this.validationFlag.addByPassUIDField(listFieldItem.uid!, 'textResponse');
               return false;
          });
          
          // Sanity check: if the lengths are not equal, there must be a duplicate response.
          // TODO: Do we need to throw or return here? Assuming throw, since a duplicate response shouldn't be possible.
          if (selectedListFieldItems.length != answer.responses.length) {
               throw new ValidationError("Duplicate response detected in FormResponse.");
          }
          
          if (valid) {
               this.validatedAnswers.push(answer);
          }
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
