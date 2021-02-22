/* Retrieve and Modify Mock Data for the API tests
 */

import * as Mocks from "@dateam/shared/build/MockData";
import * as Model from "@dateam/shared/build/ClassDef"
import {GenericJsonSerializer as serializer} from "@dateam/shared";


/** Mocks */

export function getMockPatient(){
    const patient = Mocks.genPatientComplete();
    return serializer.encode(patient, Model.Patient);
}

export function getMockProcedure(){
    const procedure = Mocks.genProcedureComplete();
    return serializer.encode(procedure, Model.Procedure);
}

export function getMockForm(){
    const form = Mocks.buildFormComplete();
    return serializer.encode(form, Model.SDCForm)
}

export function getMockFormResponse(){
    const form_response = Mocks.genFormResponseComplete();
    return serializer.encode(form_response, Model.SDCFormResponse);
}