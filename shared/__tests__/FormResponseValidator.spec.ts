import {FormResponseValidator} from "../build/FormResponseValidator";
import * as Mocks from "../build/MockData";

describe("Verify Form Response Validator", () => {
    function validateFormResponse(){
        FormResponseValidator.validate(Mocks.buildFormResponseComplete(), Mocks.buildFormComplete());
    }
    test("Basic Case: Mock Data", done => {
        expect(validateFormResponse).not.toThrow();
        done();
    });
});
