/**
 * Verify objs conform to schema in openapi.yml
 */

import {
  GenericClassValidator as validator,
  GenericJsonSerializer as serializer,
} from "@dateam/shared";
import * as Model from "@dateam/shared/build/ClassDef";

/** Generic validator */
function validate(obj, expectedClass) {
  let isValid;
  try {
    serializer.decode(obj, expectedClass);
    isValid = true;
  } catch (e) {
    console.log(e);
    isValid = false;
  }
  return isValid;
}

export default {
  isPatient(received) {
    const pass = validate(received, Model.Patient);
    if (pass) {
      return {
        message: () => `expected ${received} to not be a valid patient object`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid patient object`,
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
        message: () => `expected ${received} to be a valid procedure object`,
        pass: false,
      };
    }
  },
  isForm(received) {
    const pass = validate(received, Model.SDCForm);
    if (pass) {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} to not be a valid form object`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} to be a valid form object`,
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
        message: () => `expected ${received} to not be a list`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a list`,
        pass: false,
      };
    }
  },
  isListEmpty(received) {
    // PreCondition: received is an array
    const pass = received.length == 0;
    if (pass) {
      return {
        message: () => `expected ${received} to not be empty`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be empty`,
        pass: false,
      };
    }
  },
  allPatientItems(received) {
    // PreCondition: received is an array
    let pass = true;
    received.forEach((element) => {
      pass = pass && validate(element, Model.Patient);
    });
    if (pass) {
      return {
        message: () => `expected ${received} to not only contain Patient items`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to only contain Patient items`,
        pass: false,
      };
    }
  },
  allProcedureItems(received) {
    // PreCondition: received is an array
    let pass = true;
    received.forEach((element) => {
      pass = pass && validate(element, Model.Procedure);
    });
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not only contain Procedure items`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to only contain Procedure items`,
        pass: false,
      };
    }
  },
  containsPatient(received, patientId) {
    // PreCondition: received is an array of Patient items
    let pass = false;
    received.forEach((element) => {
      let patient = serializer.decode(element, Model.Patient);
      if (patient.id == patientId) {
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
        message: () => `expected ${received} to contain the specified patient`,
        pass: false,
      };
    }
  },
  isAllFormItems(received) {
    // PreCondition: received is an array of Patient items
    let pass = true;
    received.forEach((element) => {
      pass = pass && validate(element, Model.SDCForm);
    });
    if (pass) {
      return {
        message: () => `expected ${received} to not only contain Form Items`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to contain only form items`,
        pass: false,
      };
    }
  },
  containsID(received, expectedId, expectedType) {
    // PreCondition: all items are of the same type: expectedType
    let pass = false;
    received.forEach((element) => {
      let obj = serializer.decode(element, expectedType);

      if (obj.uid == expectedId) {
        pass = true;
      }
    });
    if (pass) {
      return {
        message: () => `expected ${received} to not contain the specified ID`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to contain the specified ID`,
        pass: false,
      };
    }
  },
  hasFormId(received, expectedId) {
    // PreCondition: received is a Form item
    let form = serializer.decode(received, Model.SDCForm);
    const pass = form.uid == expectedId;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not have form id of ${expectedId}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have form id of ${expectedId}`,
        pass: false,
      };
    }
  },
  hasPatientId(received, expectedId) {
    // PreCondition: received is a Patient item
    let patient = serializer.decode(received, Model.Patient);
    const pass = patient.uid == expectedId;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not have patient id of ${expectedId}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to have patient id of ${expectedId}`,
        pass: false,
      };
    }
  },
  hasProcedureId(received, expectedId) {
    // PreCondition: received is a procedure item
    let proc = serializer.decode(received, Model.Procedure);
    const pass = proc.uid == expectedId;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not have procedure id of ${expectedId}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to have procedure id of ${expectedId}`,
        pass: false,
      };
    }
  },
  hasResponseId(received, expectedId) {
    // PreCondition: received is a form response item
    let resp = serializer.decode(received, Model.SDCFormResponse);
    const pass = resp.uid == expectedId;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to not have response id of ${expectedId}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to have response id of ${expectedId}`,
        pass: false,
      };
    }
  },
};
