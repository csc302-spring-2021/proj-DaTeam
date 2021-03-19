import { Mocks, Model, GenericJsonSerializer } from "@dateam/shared";
import * as assert from "assert";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

process.env.NODE_ENV = "test_db";
dotenv.config({
  path: "../.env",
});
// cannot use import here because import is executed at the very beginning
const databaseManager = require("../build/db").databaseManager;

function strip(obj, targetClass) {
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
  test("Test Form Partial", async (done) => {
    await expect(form1).verifyCreateRead(Model.SDCForm);
    done();
  });
  test("Test Form Complete", async (done) => {
    await expect(form2).verifyCreateRead(Model.SDCForm);
    done();
  });
  test("Test Patient", async (done) => {
    await expect(patient).verifyCreateRead(Model.Patient);
    done();
  });
  test("Test Form Response", async (done) => {
    // this test depends on the previouse tests for the uid
    response.formId = form1.uid;
    response.patientID = patient.uid;
    await expect(response).verifyCreateRead(Model.SDCFormResponse);
    done();
  });
});

describe("Verify Search from DB Works", () => {
  let allUids = [],
    searchTargetUids = [];
  const testFormId = uuid();
  beforeAll(async (done) => {
    let form = Mocks.buildFormComplete();
    await databaseManager.genericCreate(form, Model.SDCForm);
    allUids.push(form.uid);

    form = Mocks.buildFormComplete();
    form.id = testFormId;
    await databaseManager.genericCreate(form, Model.SDCForm);
    allUids.push(form.uid);
    searchTargetUids.push(form.uid);

    form = Mocks.buildFormComplete();
    form.id = testFormId;
    await databaseManager.genericCreate(form, Model.SDCForm);
    allUids.push(form.uid);
    searchTargetUids.push(form.uid);
    done();
  });
  test("Search all SDCForms", async (done) => {
    let result = await databaseManager.genericSearch(Model.SDCForm, {}, true);
    result.forEach((o) => {
      expect(o).toBeInstanceOf(Model.SDCForm);
    });
    expect(result.map((o) => o.uid)).toEqual(expect.arrayContaining(allUids));
    done();
  });
  test("Search all SDCForms with id", async (done) => {
    let result = await databaseManager.genericSearch(
      Model.SDCForm,
      { SDCNode: [`item.id = '${testFormId}'`] },
      true
    );
    result.forEach((o) => {
      expect(o).toBeInstanceOf(Model.SDCForm);
    });
    expect(result.map((o) => o.uid)).toEqual(searchTargetUids);
    done();
  });
});

describe.skip("Verify Delete from DB Works", () => {
  // Skipping because delete is not implemented in the proper DatabaseManager
  // Thus not implemented in the MockDatabaseManager yet
  test("Delete Base case", (done) => {
    done();
  });
});

afterAll(() => {
  databaseManager.endConnection();
});
