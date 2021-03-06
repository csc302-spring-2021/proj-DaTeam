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
        outer:
        for(let item of form.children){
            for(let field of item.children){
                if(field instanceof Model.SDCListField){
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
    test("Response for ListField Item w/o valid ID Throws Validation Error", done => {
        for(let answer of formResponse.answers){
            if('list-1' === answer.questionID){
                answer.responses.push('fake id; should fail');
                break;
            }
        }
        expect(validateFormResponse).toThrowError(ValidationError);
        done();
    });
    test("Form Response with more responses than maxSelections returns Validation Error", done => {
        // Original Mock data should trigger this failure since maxSelections is set to 1 and 
        // there are originally 3 responses to the ListField: [ 'list-1-t', 'list-1-1', 'list-1-2' ]
        validateFormResponse();
        expect(errors).containsError("Selection count above maximum.");

        done();
    });
    test("Form Response with less responses than minSelections returns Validation Error", done => {
        //  Originally minSelections is set to 1 and there are 3 responses to the ListField: [ 'list-1-t', 'list-1-1', 'list-1-2' ]
        // Modify maxSelections=10 and minSelections=5, original responses should trigger error
        outer:
        for(let item of form.children){
            for(let field of item.children){
                if(field instanceof Model.SDCListField){
                    field.maxSelections = 10;
                    field.minSelections = 5;
                    break outer;
                }
            }
        }
        validateFormResponse();
        expect(errors).containsError("Selection count below minimum.");

        done();
    });
});