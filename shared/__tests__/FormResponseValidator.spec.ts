import {FormResponseValidator} from "../build/FormResponseValidator";
import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import {ValidationError} from "../build/Utils";

beforeAll(() => {
    expect.extend({
        containsError(received, errorTxt) {
            let pass = false;
            let messages = received.map(err => err.message);
            for(let msg_i in messages){
                let msg = messages[msg_i];
                if(msg === errorTxt){
                    pass = true;
                    break;
                }
            }
            if (pass) {
              return {
                message: () =>
                  `expected ${received} to not contain error with text ${errorTxt}`,
                pass: true,
              };
            } else {
              return {
                message: () =>
                  `expected ${received} to contain error with text ${errorTxt}`,
                pass: false,
              };
            }
          }
    });
});

describe("Verify Form Response Validator", () => {
    function validateFormResponse(){
        FormResponseValidator.validate(Mocks.buildFormResponseComplete(), Mocks.buildFormComplete());
    }
    test("Basic Case: Default Mock Data Passes", done => {
        expect(validateFormResponse).not.toThrow();
        done();
    });
});

describe("Verify TextField Failures", () => {
    let form, formResponse, errors;
    ;
    beforeAll(() => {
        form = Mocks.buildFormComplete();
    });
    beforeEach(() => {
        formResponse = Mocks.buildFormResponseComplete();
    });
    function validateFormResponse(){
        errors = FormResponseValidator.validate(formResponse, form);
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
    test("Empty Responses Returns Validation Error", done => {
        for(let answer of formResponse.answers){
            if("text-1" === answer.questionID){
                answer.responses = [];
                break;
            }
        }
        validateFormResponse();
        expect(errors).containsError('Question must be answered');
        done();
    });
    test("Invalid Response (non-int) Returns Validation Error", done => {
        for(let answer of formResponse.answers){
            if("text-1" === answer.questionID){
                answer.responses = ["this should throw an error"];
                break;
            }
        }
        expect(errors).containsError('Input is not a valid int');
        done();
    });
});

describe("Verify ListField Failures", () => {
    let form, formResponse, errors;
    beforeEach(() => {
        form = Mocks.buildFormComplete();
        formResponse = Mocks.buildFormResponseComplete();
    });
    function validateFormResponse(){
        errors = FormResponseValidator.validate(formResponse, form);
    }
    test("ListField Item w/ selectionDeselectsSiblings enabled and >1 responses Throws Validation Error", done => {
        // Modify the all SDCListField item option to have selectionDeselectsSiblings is enabled
        // The Mock Response already has multiple responses for the listfield
        let qId;
        outer:
        for(let item of form.children){
            for(let field of item.children){
                if(field instanceof Model.SDCListField){
                    qId = field.id;
                    for(let opt of field.options){
                       opt.selectionDeselectsSiblings = true;
                    }
                    break outer;
                }
            }
        }
        expect(validateFormResponse).toThrowError(ValidationError);
        done();
    });
});