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