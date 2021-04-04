import * as Mocks from "../build/MockData";
import * as Model from "../build/ClassDef";
import * as QueryObject from "../build/QueryObject";
import { GenericClassValidator } from "../build/ClassValidator";

describe("Mock Data Validator Test", () => {
  test.each(Object.entries(Mocks))("Test validation for %s", (name, func) => {
    GenericClassValidator.validate(func());
  });
});

describe("Verify Invalid Cases", () => {
  let form;
  beforeEach(() => {
    form = Mocks.buildFormComplete();
  });
  function validateForm() {
    GenericClassValidator.validate(form);
  }
  test("Root level property invalid", (done) => {
    form.formProperties = 1;
    expect(validateForm).toThrow();
    done();
  });
  test("Super class property invalid", (done) => {
    form.uid = 1;
    expect(validateForm).toThrow();
    done();
  });
  test("Sub level missing attribute", (done) => {
    form.children[0].id = null;
    expect(validateForm).toThrow();
    done();
  });
  test("Child of child is invalid", (done) => {
    form.children[0].children.push({});
    expect(validateForm).toThrow();
    done();
  });
  test("Attribute validator failed", (done) => {
    form.order = -1;
    expect(validateForm).toThrow();
    done();
  });
});

describe("Query Object Serialization Tests", () => {
  let obj;
  function validateObj() {
    GenericClassValidator.validate(obj);
  }
  test("Simple case", (done) => {
    obj = QueryObject.query(
      Model.Patient,
      QueryObject.contains("name", "Henry").not()
    );
    validateObj();
    done();
  });
  test("Complicated case", (done) => {
    obj = QueryObject.query(
      Model.Patient,
      QueryObject.contains("name", "Henry").and(
        QueryObject.equals("id", "5").or(QueryObject.equals("id", "3")).not()
      )
    );
    validateObj();
    done();
  });
  test("Invalid class", (done) => {
    obj = new QueryObject.Query({
      targetClass: "Password",
      condition: QueryObject.contains("user", "Henry"),
    });
    expect(validateObj).toThrow("Password is not a valid targetClass");
    done();
  });
  test("Invalid column", (done) => {
    obj = QueryObject.query(
      Model.Patient,
      QueryObject.contains("name", "Henry").and(
        QueryObject.greaterOrEq("age", "5")
          .or(QueryObject.equals("age", "3"))
          .not()
      )
    );
    expect(validateObj).toThrow("age is not a valid column");
    done();
  });
  test("Invalid column opt", (done) => {
    obj = QueryObject.query(
      Model.Patient,
      new QueryObject.ColumnCondition({
        opt: "!=",
        column: "id",
        value: "5",
      })
    );
    expect(validateObj).toThrow("!= is not a valid opt");
    done();
  });
  test("Invalid binary opt", (done) => {
    obj = QueryObject.query(
      Model.Patient,
      new QueryObject.BinaryOpt({
        opt: "&&",
        lhs: QueryObject.equals("name", "Henry"),
        rhs: QueryObject.equals("name", "Henry"),
      })
    );
    expect(validateObj).toThrow("&& is not a valid opt");
    done();
  });
});
