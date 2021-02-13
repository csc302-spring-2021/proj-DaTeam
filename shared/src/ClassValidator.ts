/**
 * Class validators definitions for domain objects
 * Important! Do not reuse validator objects!
 */

import { classMeta, textFieldTypeMeta } from "./ClassMeta"
import * as SDC from "./ClassDef";
import { StackUtil } from "./Utils"

class ValidationError extends Error {}

/** Offers call stack support for error */
abstract class Validator{
     protected stackUtil: StackUtil = new StackUtil("Root", ValidationError)
}

/** This validator can only validate object integrity based on classMeta */
export class GenericClassValidator extends Validator{

     protected constructor(){ super() }

     /**
      * Validate an object 
      * 
      * @param obj object to validate
      * @param className use the validation logic of this class
      */
     static validate(obj: any, className?: string){
          return new this()._validate(obj, className)
     }
     
     /**
      * Validate an object 
      * 
      * @param obj object to validate
      * @param className use the validation logic of this class
      */
     protected _validate(obj: any, className?: string){
          if (className == null) className = obj.constructor.name
          if (className == null) throw this.stackUtil.genError("Unable to determine class")

          const targetClass = classMeta[className]
          if (targetClass == null) throw this.stackUtil.genError("Unsupported class: " + className)
          
          if (targetClass.super) this._validate(obj, targetClass.super)

          for (let [id, targetField] of Object.entries(targetClass.fields)){
               const field = obj[id]
               if (field == null){
                    if (targetField.nullable) {
                         continue
                    } else {
                         throw this.stackUtil.genError("Missing attribute: " + id)
                    }
               }
               if (targetField.type !== field.constructor.name) {
                    throw this.stackUtil.genError("Attribute type error: " + id)
               }
               if (targetField.validator && !targetField.validator(obj)) {
                    throw this.stackUtil.genError("Attribute invalid: " + id)
               }
               if (targetField.generic) {
                    this.stackUtil.enter(id)
                    if (targetField.type === "Array") {
                         (field as Array<any>).forEach(o => this._validate(o))
                    } else {
                         this._validate(field)
                    }
                    this.stackUtil.leave(id)
               }
          }
     }
}


// For front end text field formate validation, use classMeta.textFieldTypeMeta.validator
export class ResponseValidator extends Validator{

     /**
      * Validate a form response, return a list of validation errors on all question
      * @param response form response to validate
      * @param form form corresponded to the response
      */
     static validateResponse(response: SDC.SDCFormResponse, form: SDC.SDCForm): ValidationError[]{
          // TODO
          return null as any
     }

     /**
      * Validate one answer based on the provided form
      * @param answer answer to validate
      * @param form form corresponded to the response
      */
     static validateAnswer(answer: SDC.SDCAnswer, form: SDC.SDCForm){
          // TODO
     }
}