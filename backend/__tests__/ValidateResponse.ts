/**
 * Verify objs conform to schema in openapi.yml
 */

import {GenericClassValidator as validator} from "@dateam/shared";
import * as Model from "@dateam/shared/build/ClassDef";
import * as Mock from "./MockData";

/** Generic validator */
function validate(obj, expectedClass){
  let isValid = false;
  if (typeof obj === 'object' && obj !== null){
      isValid = true;
      let jsonObj = Mock.JsonToObj(obj, expectedClass);
      try{
        validator.validate(jsonObj);
      } catch(e){
        isValid = false;
      }
  }
  return isValid;
}

export default {
  isPatient(received) {
      const pass = validate(received, Model.Patient);
      if (pass) {
      return {
          message: () =>
          `expected ${received} to not be a valid patient object`,
          pass: true,
      };
      } else {
      return {
          message: () =>
          `expected ${received} to be a valid patient object`,
          pass: false,
      };
      }
  },
  isProcedure(received) {
      const pass = validate(received, Model.Procedure);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not be a valid procedure object`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be a valid procedure object`,
          pass: false,
        };
      }
    },
    isForm(received) {
      const pass = validate(received, Model.SDCForm);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not be a valid form object`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be a valid form object`,
          pass: false,
        };
      }
    },
    isFormResponse(received) {
      const pass = validate(received, Model.SDCFormResponse);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not be a valid form response object`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be a valid form response object`,
          pass: false,
        };
      }
    }
}