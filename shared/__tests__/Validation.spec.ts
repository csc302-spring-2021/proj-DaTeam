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

describe.skip("Verify Invalid Cases", () => {
    test("Root level property invalid" , done => {
        done();
    });
    test("Super class property invalid" , done => {
        done();
    });
    test("Sub level missing attribute" , done => {
        done();
    });
    test("Child of child is invalid" , done => {
        done();
    });
    test("Attribute validator failed" , done => {
        done();
    });
});