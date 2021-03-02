import * as Mocks from "../build/MockData";
import { GenericClassValidator } from "../build/ClassValidator";

describe("Mock Data Validator Test", () => {
    for (let [name, func] of Object.entries(Mocks)){
        test(`Test validation for ${name}`, done => {
            GenericClassValidator.validate(func());
            done();
        });
    }
});

describe("Verify Invalid Cases", () => {
    let form;
    beforeAll(() => {
        form = Mocks.buildFormComplete();
    });
    function validateForm(){
        GenericClassValidator.validate(form);
    }
    test("Root level property invalid" , done => {
        form.formProperties = 1;
        expect(validateForm).toThrow();
        done();
    });
    test("Super class property invalid" , done => {
        form.uid = 1;
        expect(validateForm).toThrow();
        done();
    });
    test("Sub level missing attribute" , done => {
        form.children[0].id = null;
        expect(validateForm).toThrow();
        done();
    });
    test("Child of child is invalid" , done => {
        form.children[0].children.push({});
        expect(validateForm).toThrow();
        done();
    });
    test("Attribute validator failed" , done => {
        form.order = -1;
        expect(validateForm).toThrow();
        done();
    });
});