/**
 * Validator for SDCFormResponse
 * For front end text field formate validation, use classMeta.textFieldTypeMeta.validator
 */

import { StackUtil, ValidationError } from "./Utils"
import * as Model from "./ClassDef"

// For front end text field formate validation, use classMeta.textFieldTypeMeta.validator
export class ResponseValidator {

     protected stackUtil: StackUtil = new StackUtil("Root", ValidationError)
     
     protected constructor(){}

     /**
      * Validate a form response, return a list of validation errors on all question
      * @param response form response to validate
      * @param form form corresponded to the response
      */
     static validateResponse(response: Model.SDCFormResponse, form: Model.SDCForm): ValidationError[]{
          // TODO
          return null as any
     }

     /**
      * Validate one answer based on the provided form
      * @param answer answer to validate
      * @param form form corresponded to the response
      */
     static validateAnswer(answer: Model.SDCAnswer, form: Model.SDCForm){
          // TODO
     }
}
