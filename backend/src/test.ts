/* import express, { application } from "express";
import { SDCForm, SDCNode, SDCFormJsonSerializer } from "@dateam/shared";

import * as config from "./config.json";
import pgPromise from "pg-promise";

console.log(config.app.port);

let template = new SDCForm();
template.id = "id";
template.uid = "uid";
template.lineage = "lineage";
template.version = "version";

let template2 = new SDCForm();
template2.id = "id2";
template2.uid = "uid2";
template2.lineage = "lineage";
template2.version = "version";

template.children.push(template2);
// new GenericClassValidator().validate(template)

let json = SDCFormJsonSerializer.encode(template);
// let json = '{"children":5,"maxSelections":1,"minSelections":1,"class":"SDCForm","formProperties":[],"id":"id","uid":"uid","lineage":"lineage","version":"version"}'
let { model, flatMap } = SDCFormJsonSerializer.decode(json);
console.log("model");
console.log(model);
console.log("maps");
console.log(flatMap);

const pgp = pgPromise();
const db = pgp(config.db.connectOptions);
db.any("select * from item")
  .then((v) => {
    console.log(v);
  })
  .catch((e) => {
    console.log(e);
  });
console.log("done");
 */