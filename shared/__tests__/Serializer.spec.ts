import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import { GenericJsonSerializer } from "../build/ClassJsonSerializer";

describe("Basic Serializer Tests", () => {
    beforeAll(() => {
        const obj = Mocks.buildFormComplete()
        const encoded = GenericJsonSerializer.encode(obj, Model.SDCForm)
        const decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm)
    });
    test("Encode then decode, expecting no output", done => {
        done();
    });
    test("Encoding object is unexpected", done => {
        done();
    });
    test("Decoding object is unexpected", done => {
        done();
    });
});
