/**
 * This is not the proper way to write a test, but that will do for now
 */
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? "./.env" : "../.env",
});

import { databaseManager } from "./db/DatabaseManager";
import { Mocks, Model, GenericJsonSerializer } from "@dateam/shared";
import util from "util";
import * as assert from "assert";

const log = console.log;
const inspect = (o: any) => {
  log(util.inspect(o, false, null, true));
};

function strip(obj: any, targetClass: Function): any {
  return GenericJsonSerializer.decode(
    GenericJsonSerializer.encode(obj, targetClass),
    targetClass
  );
}

async function testAll() {
  const form1 = Mocks.buildFormPartial();
  const form2 = Mocks.buildFormComplete();
  const response = Mocks.buildFormResponsePartial();
  const patient = Mocks.genPatientPartial();

  /** Test for create and read */

  // inspect(form2);
  let uid = await databaseManager.genericCreate(form2, Model.SDCForm);
  let loaded = await databaseManager.genericRead(uid, Model.SDCForm);
  assert.deepStrictEqual(
    strip(form2, Model.SDCForm),
    strip(loaded, Model.SDCForm)
  );

  // inspect(patient);
  uid = await databaseManager.genericCreate(patient, Model.Patient);
  loaded = await databaseManager.genericRead(uid, Model.Patient);
  assert.deepStrictEqual(
    strip(patient, Model.Patient),
    strip(loaded, Model.Patient)
  );

  response.patientID = uid;

  // inspect(response);
  uid = await databaseManager.genericCreate(response, Model.SDCFormResponse);
  loaded = await databaseManager.genericRead(uid, Model.SDCFormResponse);
  assert.deepStrictEqual(
    strip(response, Model.SDCFormResponse),
    strip(loaded, Model.SDCFormResponse)
  );

  uid = await databaseManager.genericCreate(form1, Model.SDCForm);
  loaded = await databaseManager.genericRead(uid, Model.SDCForm);
  assert.deepStrictEqual(
    strip(form1, Model.SDCForm),
    strip(loaded, Model.SDCForm)
  );
  
  /** Test for search */

  databaseManager.genericSeach(Model.SDCForm, {}, true).then(inspect);
  databaseManager
    .genericSeach(
      Model.SDCFormProperty,
      { SDCFormProperty: [`formId = '${uid}'`] },
      false
    )
    .then(inspect);
}

testAll();
