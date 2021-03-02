import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import { GenericJsonSerializer } from "../build/ClassJsonSerializer";

describe("Basic Serializer Tests", () => {
    let obj, encoded, decoded;
    beforeAll(() => {
        obj = Mocks.buildFormComplete()
        encoded = GenericJsonSerializer.encode(obj, Model.SDCForm)
        decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm)
    });
    test("Encode then decode, expecting no output", done => {
        expect(obj).toStrictEqual(decoded);
        done();
    });
    test("Encoding object is unexpected", done => {
        expect(() => {
            GenericJsonSerializer.encode(obj, Model.SDCFormResponse);
        }).toThrow();
        done();
    });
    test("Decoding object is unexpected", done => {
        expect(() => {
            GenericJsonSerializer.decode(encoded, Model.SDCFormResponse);
        }).toThrow();
        done();
    });
});
