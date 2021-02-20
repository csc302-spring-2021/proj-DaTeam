/* Retrieve and Modify Mock Data for the API tests
 */

import * as Mocks from "@dateam/shared/build/MockData";

export function JsonToObj(jsonObj, toClass){
    return new toClass(jsonObj);
}

/** Mocks */

export function getMockPatient(){
    return Mocks.genPatientComplete();
}

export function getMockProcedure(){
    return Mocks.genProcedureComplete();
}

export function getMockForm(){
    return Mocks.genFormComplete();
}

export function getMockFormResponse(){
    return Mocks.genFormResponseComplete();
}