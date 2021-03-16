import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import * as QueryObject from "../build/QueryObject";
import { GenericJsonSerializer } from "../build/ClassJsonSerializer";

describe("Basic Serialization Tests", () => {
  let obj, encoded, decoded;
  beforeAll(() => {
    obj = Mocks.buildFormComplete();
    encoded = GenericJsonSerializer.encode(obj, Model.SDCForm);
    decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm);
  });
  test("Encode then decode, expecting no output", (done) => {
    expect(obj).toStrictEqual(decoded);
    done();
  });
  test("Encoding object is unexpected", (done) => {
    expect(() => {
      GenericJsonSerializer.encode(obj, Model.SDCFormResponse);
    }).toThrow();
    done();
  });
  test("Decoding object is unexpected", (done) => {
    expect(() => {
      GenericJsonSerializer.decode(encoded, Model.SDCFormResponse);
    }).toThrow();
    done();
  });
});

describe("Query Object Serialization Tests", () => {
  test("Simple case", (done) => {
    const obj = QueryObject.query(
      Model.Patient,
      QueryObject.contains("name", "Henry").not()
    );
    const encoded = GenericJsonSerializer.encode(obj, QueryObject.Query);
    const decoded = GenericJsonSerializer.decode(encoded, QueryObject.Query);
    expect(obj).toStrictEqual(decoded);
    done();
  });
  test("Complicated case", (done) => {
    const obj = QueryObject.query(
      Model.Patient,
      QueryObject.contains("name", "Henry").and(
        QueryObject.greaterOrEq("age", "5")
          .or(QueryObject.equals("age", "3"))
          .not()
      )
    );
    const encoded = GenericJsonSerializer.encode(obj, QueryObject.Query);
    const decoded = GenericJsonSerializer.decode(encoded, QueryObject.Query);
    expect(obj).toStrictEqual(decoded);
    done();
  });
});
