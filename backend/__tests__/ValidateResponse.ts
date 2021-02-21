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
    },
    isList(received) {
      const pass = Array.isArray(received);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not be a list`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be a list`,
          pass: false,
        };
      }
    },
    isListEmpty(received){
      // PreCondition: received is an array
      const pass = (received.length == 0);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not be empty`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be empty`,
          pass: false,
        };
      }
    },
    allPatientItems(received) {
      // PreCondition: received is an array
      let pass = true;
      received.forEach(element => {
        pass = pass && validate(element, Model.Patient);
      });
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not only contain Patient items`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to only contain Patient items`,
          pass: false,
        };
      }
    },
    containsPatient(received, patientName, patientId){
      // PreCondition: received is an array of Patient items
      let pass = false;
      received.forEach(element => {
        let patient = Mock.JsonToObj(element, Model.Patient);
        if(patient.id == patientId && patient.name == patientName){
          pass = true;
        }
      });
      if (pass) {
        return {
          message: () =>
            `expected ${received} to not contain the specified patient`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to contain the specified patient`,
          pass: false,
        };
      }
    }
}