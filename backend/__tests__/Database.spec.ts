import { databaseManager } from "../build/db/DatabaseManager";
import { Mocks, Model, GenericJsonSerializer } from "@dateam/shared";
import * as assert from "assert";

function strip(obj: any, targetClass: Function): any {
  return GenericJsonSerializer.decode(
    GenericJsonSerializer.encode(obj, targetClass),
    targetClass
  );
}

beforeAll(() => {
  expect.extend({
    async verifyCreateRead(received, objClass) {
      let pass, errorTxt;
      try {
        const uid = await databaseManager.genericCreate(received, objClass);
        const loaded = await databaseManager.genericRead(uid, objClass);
        assert.deepStrictEqual(
          strip(received, objClass),
          strip(loaded, objClass)
        );
        pass = true;
      } catch (e) {
        errorTxt = e.message;
        pass = false;
      }

      if (pass) {
        return {
          message: () =>
            `Create and Read for ${received} of type ${objClass} was successful`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `Could not Create and Read ${received} of type ${objClass}. Error message: ${errorTxt}`,
          pass: false,
        };
      }
    },
  });
});

describe("Verify Create and Read from DB Works", () => {
  let form1, form2, response, patient;
  beforeAll(() => {
    form1 = Mocks.buildFormPartial();
    form2 = Mocks.buildFormComplete();
    response = Mocks.buildFormResponsePartial();
    patient = Mocks.genPatientPartial();
  });
  test("Test Form Partial", (done) => {
    done();
  });
  test("Test Form Complete", (done) => {
    done();
  });
  test("Test Patient", (done) => {
    done();
  });
  test("Test Form Response", (done) => {
    done();
  });
});

describe("Verify Search from DB Works", () => {
  test("Generic Search", (done) => {
    done();
  });
});
