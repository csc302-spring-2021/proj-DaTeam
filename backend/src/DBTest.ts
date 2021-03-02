/**
 * This is not the proper way to write a test, but that will do for now
 */
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? "./.env" : "../.env",
});

import { databaseManager } from "./db/DatabaseManager"
import { Mocks, Model } from "@dateam/shared"
import util from "util"

const log = console.log
const inspect = (o: any) => { log(util.inspect(o, false, null, true)) }

async function testAll(){
  const form1 = Mocks.buildFormPartial()
  const form2 = Mocks.buildFormComplete()
  const response = Mocks.buildFormResponseComplete()
  const patient = Mocks.genPatientPartial()

  inspect(form1)
  let uid = await databaseManager.genericCreate(form1, Model.SDCForm)

  inspect(form2)
  uid = await databaseManager.genericCreate(form2, Model.SDCForm)
  console.log(uid)

  inspect(patient)
  uid = await databaseManager.genericCreate(patient, Model.Patient)
  console.log(uid)

  response.patientID = uid

  inspect(response)
  uid = await databaseManager.genericCreate(response, Model.SDCFormResponse)
}

testAll()
