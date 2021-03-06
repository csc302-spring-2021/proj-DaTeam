import {FormResponseValidator} from "../build/FormResponseValidator";
import * as Mocks from "../build/MockData";
import {ValidationError} from "../build/Utils";

describe("Verify Form Response Validator", () => {
    function validateFormResponse(){
        FormResponseValidator.validate(Mocks.buildFormResponseComplete(), Mocks.buildFormComplete());
    }
    test("Basic Case: Mock Data", done => {
        expect(validateFormResponse).not.toThrow();
        done();
    });
});

describe("Verify TextField Failures", () => {
    let form, formResponse;
    beforeAll(() => {
        form = Mocks.buildFormComplete();
    });
    beforeEach(() => {
        formResponse = Mocks.buildFormResponseComplete();
    });
    function validateFormResponse(){
        FormResponseValidator.validate(formResponse, form);
    }
    test("Multiple Responses Throws Validation Error", done => {
        for(let answer of formResponse.answers){
            if("text-1" === answer.questionID){
                answer.responses.push('6');
                break;
            }
        }
        expect(validateFormResponse).toThrowError(ValidationError);
        done();
    });
    test("No Responses Throws Validation Error", done => {
        for(let answer of formResponse.answers){
            if("text-1" === answer.questionID){
                delete answer.responses;
                break;
            }
        }
        expect(validateFormResponse).toThrowError(ValidationError);
        done();
    });
});