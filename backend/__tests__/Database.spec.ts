import { Mocks, Model, GenericJsonSerializer, Query } from "@dateam/shared";
import * as assert from "assert";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { QueryObjectCompiler } from "../build/db/DBSerializer";

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
  let form1, form2, response, patient, procedure;
  beforeAll(() => {
    form1 = Mocks.buildFormPartial();
    form2 = Mocks.buildFormComplete();
    response = Mocks.buildFormResponsePartial();
    patient = Mocks.genPatientComplete();
    procedure = Mocks.genProcedurePartial();
  });
  test("Test Procedure Partial", async (done) => {
    const uid = await databaseManager.genericCreate(procedure, Model.Procedure);
    const loaded = await databaseManager.genericRead(uid, Model.Procedure);
    expect(loaded.creationTime).toBeInstanceOf(Date);
    expect(loaded.updateTime).toBeInstanceOf(Date);
    loaded.creationTime = null;
    loaded.updateTime = null;
    expect(strip(procedure, Model.Procedure)).toStrictEqual(
      strip(loaded, Model.Procedure)
    );
    done();
  });
  test("Test Form Partial", async (done) => {
    const uid = await databaseManager.genericCreate(form1, Model.SDCForm);
    const loaded = await databaseManager.genericRead(uid, Model.SDCForm);
    expect(loaded.creationTime).toBeInstanceOf(Date);
    expect(loaded.updateTime).toBeInstanceOf(Date);
    loaded.creationTime = null;
    loaded.updateTime = null;
    expect(strip(form1, Model.SDCForm)).toStrictEqual(
      strip(loaded, Model.SDCForm)
    );
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
    const uid = await databaseManager.genericCreate(
      response,
      Model.SDCFormResponse
    );
    const loaded = await databaseManager.genericRead(
      uid,
      Model.SDCFormResponse
    );
    expect(loaded.creationTime).toBeInstanceOf(Date);
    expect(loaded.updateTime).toBeInstanceOf(Date);
    loaded.creationTime = null;
    loaded.updateTime = null;
    expect(strip(response, Model.SDCFormResponse)).toStrictEqual(
      strip(loaded, Model.SDCFormResponse)
    );
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
    let result = await databaseManager.genericSearch(Model.SDCForm, null, true);
    result.forEach((o) => {
      expect(o).toBeInstanceOf(Model.SDCForm);
    });
    expect(result.map((o) => o.uid)).toEqual(expect.arrayContaining(allUids));
    done();
  });
  test("Search all SDCForms with id", async (done) => {
    let result = await databaseManager.genericSearch(
      Model.SDCForm,
      Query.query(Model.SDCForm, Query.equals("id", testFormId)),
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

describe("Verify QueryObjectCompiler", () => {
  test("Simple Case", () => {
    expect(
      QueryObjectCompiler.compile(
        Query.query(Model.Patient, Query.equals("name", "Henry"))
      )
    ).toEqual(
      expect.objectContaining({
        query: "patient.name = 'Henry'",
        usedColumns: { Patient: ["name"] },
      })
    );
  });
  test("Composite Condition", () => {
    expect(
      QueryObjectCompiler.compile(
        Query.query(
          Model.Patient,
          Query.equals("name", "Henry")
            .not()
            .and(Query.startsWith("id", "%%").or(Query.endsWith("id", "__")))
        )
      )
    ).toEqual(
      expect.objectContaining({
        query:
          "(not (patient.name = 'Henry')) and ((patient.id like '\\%\\%%') or (patient.id like '%\\_\\_'))",
        usedColumns: { Patient: ["name", "id"] },
      })
    );
  });
  test("polymorphism", () => {
    expect(
      QueryObjectCompiler.compile(
        Query.query(
          Model.SDCForm,
          Query.equals("title", "some title").or(
            Query.greaterThan("order", "5").or(Query.equals("lineage", "5.5"))
          )
        )
      )
    ).toEqual(
      expect.objectContaining({
        query:
          "(item.title = 'some title') or ((item.displayOrder > 5) or (form.lineage = '5.5'))",
        usedColumns: {
          SDCForm: ["lineage"],
          SDCNode: ["title", "displayOrder"],
        },
      })
    );
  });
});

afterAll(() => {
  databaseManager.endConnection();
});
