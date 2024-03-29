import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import * as QueryObject from "../build/QueryObject";
import { GenericJsonSerializer } from "../build/ClassJsonSerializer";

describe("Basic Serialization Tests", () => {
  test("Encode then decode, expecting no output", (done) => {
    const obj = Mocks.buildFormComplete();
    const encoded = GenericJsonSerializer.encode(obj, Model.SDCForm);
    const decoded = GenericJsonSerializer.decode(encoded, Model.SDCForm);
    expect(obj).toStrictEqual(decoded);
    done();
  });
  test("Encoding object is unexpected", (done) => {
    const obj = Mocks.buildFormComplete();
    expect(() => {
      GenericJsonSerializer.encode(obj, Model.SDCFormResponse);
    }).toThrow();
    done();
  });
  test("Decoding object is unexpected", (done) => {
    const obj = Mocks.buildFormComplete();
    const encoded = GenericJsonSerializer.encode(obj, Model.SDCForm);
    expect(() => {
      GenericJsonSerializer.decode(encoded, Model.SDCFormResponse);
    }).toThrow();
    done();
  });
});

describe("Mock Data Serialization Tests", () => {
  test.each(Object.entries(Mocks))(
    "Test serialization for %s",
    (name, func) => {
      const obj = func();
      const encoded = GenericJsonSerializer.encode(obj, obj.constructor);
      const decoded = GenericJsonSerializer.decode(encoded, obj.constructor);
      expect(decoded).toStrictEqual(obj);
    }
  );
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
      Model.SDCForm,
      QueryObject.contains("title", "test").and(
        QueryObject.greaterOrEq("order", "5")
          .or(QueryObject.equals("order", "3"))
          .not()
      )
    );
    const encoded = GenericJsonSerializer.encode(obj, QueryObject.Query);
    const decoded = GenericJsonSerializer.decode(encoded, QueryObject.Query);
    expect(obj).toStrictEqual(decoded);
    done();
  });
});
