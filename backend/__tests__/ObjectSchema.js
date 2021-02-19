/**
 * Verify objs conform to schema in openapi.yml
 */

/*
 * Returns true iff obj is a valid Error object
 * I.e, contains necessary properties
 */
function isValidError(obj){
    let isValid = false;
    if (typeof obj === 'object' && obj !== null){
        isValid = true;

    }
    return isValid;
}

/*
 * Returns true iff obj is a valid Patient object
 * I.e, contains necessary properties
 */
function isValidPatient(obj){
    let isValid = false;
    if (typeof obj === 'object' && obj !== null){
        isValid = true;
        isValid = isValid && obj.hasOwnProperty('id');
        isValid = isValid && obj.hasOwnProperty('external_id');
        isValid = isValid && obj.hasOwnProperty('name');
    }
    return isValid;
}


/*
 * Returns true iff obj is a valid Procedure object
 * I.e, contains necessary properties
 */
function isValidProcedure(obj){
    let isValid = false;
    if (typeof obj === 'object' && obj !== null){
        isValid = true;
        isValid = isValid && obj.hasOwnProperty('id');
        isValid = isValid && obj.hasOwnProperty('external_id');
        isValid = isValid && obj.hasOwnProperty('name');
    }
    return isValid;
}

/*
 * Returns true iff obj is a valid Form object
 * I.e, contains necessary properties
 */
function isValidForm(obj){
    let isValid = false;
    if (typeof obj === 'object' && obj !== null){
        isValid = true;
        isValid = isValid && obj.hasOwnProperty('id');
        isValid = isValid && obj.hasOwnProperty('title');
    }
    return isValid;
}

/*
 * Returns true iff obj is a valid FormResponse object
 * I.e, contains necessary properties
 */
function isValidFormResponse(obj){
    let isValid = false;
    if (typeof obj === 'object' && obj !== null){
        isValid = true;
        isValid = isValid && obj.hasOwnProperty('id');
    }
    return isValid;
}

export default {
    isError(received) {
        const pass = isValidError(received);
        if (pass) {
            return {
            message: () =>
                `expected ${received} to not be a valid error object`,
            pass: true,
            };
        } else {
            return {
            message: () =>
                `expected ${received} to be a valid error object`,
            pass: false,
            };
        }
    },
    isPatient(received) {
        const pass = isValidPatient(received);
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
        const pass = isValidProcedure(received);
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
        const pass = isValidForm(received);
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
        const pass = isValidFormResponse(received);
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