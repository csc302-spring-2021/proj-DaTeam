/**
 * This file contains valid mock date for all domain objects
 * complete means the object is fully complete
 * partial means the optional fields of the object are all empty
 * The validity of the objects are directly guranteed by the complier
 * All functions begin with gen only generate a single object
 * All functions begin with build will generate a complex
 */
import * as Model from "./ClassDef";
import { findNode, findAnswer } from "./Utils";
import { v4 as uuid } from "uuid";

const shortID = () => {
  return uuid().substr(0, 6);
};

export function genProcedurePartial(): Model.Procedure {
  const temp: Model.Procedure = {
    id: shortID(),
    name: "Prodecure",
  };
  return new Model.Procedure(temp);
}

export function genProcedureComplete(): Model.Procedure {
  const result = genProcedurePartial();
  result.uid = uuid();
  result.assignedFormID = uuid();
  result.creationTime = new Date();
  result.updateTime = new Date();
  return result;
}

export function genPatientPartial(): Model.Patient {
  const temp: Model.Patient = {
    id: shortID(),
    name: "Ujash",
  };
  return new Model.Patient(temp);
}

export function genPatientComplete(): Model.Patient {
  const result = genPatientPartial();
  result.uid = uuid();
  result.creationTime = new Date();
  result.updateTime = new Date();
  return result;
}

export function genFormPartial(): Model.SDCForm {
  const temp: Model.SDCForm = {
    id: "covid-19-test-" + shortID(),
    children: [],
    lineage: "Covid-19-test",
    version: shortID(),
    formProperties: [],
  };
  return new Model.SDCForm(temp);
}

export function genFormComplete(): Model.SDCForm {
  const result = genFormPartial();
  result.uid = uuid();
  result.order = 1;
  result.title = "Covid19Test";
  result.header =
    '<Header><Property type="meta" styleClass="copyright" order="410" propName="CopyrightHeader" val="(c) 2019 College of American Pathologists.  All rights reserved.  License required for use." /></Header>';
  result.footer =
    '<Footer><Property type="meta" styleClass="copyright" order="410" propName="CopyrightFooter" val="(c) 2019 College of American Pathologists.  All rights reserved.  License required for use." /></Footer>';
  result.creationTime = new Date();
  result.updateTime = new Date();
  return result;
}

export function genFormPropertyPartial(): Model.SDCFormProperty {
  const temp: Model.SDCFormProperty = {
    name: "OfficialName",
    propName: "OfficialName",
    val: "Covid 19 test",
  };
  return new Model.SDCFormProperty(temp);
}

export function genFormPropertyPartial2(): Model.SDCFormProperty {
  const temp: Model.SDCFormProperty = {
    name: "GenericHeaderText",
    propName: "GenericHeaderText",
    val: "Covid 19 Preliminary Test",
  };
  return new Model.SDCFormProperty(temp);
}

export function genFormPropertyComplete(): Model.SDCFormProperty {
  const result = genFormPropertyPartial();
  result.order = 1;
  return result;
}

export function genFormPropertyComplete2(): Model.SDCFormProperty {
  const result = genFormPropertyPartial2();
  result.order = 2;
  return result;
}

export function genSectionPartial(): Model.SDCSection {
  const temp: Model.SDCSection = {
    id: "section-" + shortID(),
    children: [],
  };
  return new Model.SDCSection(temp);
}

export function genSectionComplete(): Model.SDCSection {
  const result = genSectionPartial();
  result.order = 1;
  result.title = "Main Section";
  result.uid = uuid();
  return result;
}

export function genDisplayItemPartial(): Model.SDCDisplayItem {
  const temp: Model.SDCDisplayItem = {
    id: "display-" + shortID(),
    title: "Please fill out this form",
    children: [],
  };
  return new Model.SDCDisplayItem(temp);
}

export function genDisplayItemComplete(): Model.SDCDisplayItem {
  const result = genDisplayItemPartial();
  result.order = 1;
  result.uid = uuid();
  return result;
}

export function genTextFieldPartial(): Model.SDCTextField {
  const temp: Model.SDCTextField = {
    id: "text-" + shortID(),
    children: [],
    type: "string",
  };
  return new Model.SDCTextField(temp);
}

export function genTextFieldComplete(): Model.SDCTextField {
  const result = genTextFieldPartial();
  result.order = 1;
  result.uid = uuid();
  result.title = "Weight";
  result.textAfterResponse = "kg";
  result.type = "int";
  return result;
}

export function genListFieldPartial(): Model.SDCListField {
  const temp: Model.SDCListField = {
    id: "list-" + shortID(),
    children: [],
    maxSelections: 1,
    minSelections: 1,
    options: [],
  };
  return new Model.SDCListField(temp);
}

export function genListFieldComplete(): Model.SDCListField {
  const result = genListFieldPartial();
  result.order = 1;
  result.uid = uuid();
  result.title = "Multiple Choice " + result.id;
  result.lookupEndPoint = "http://dateam.com/options/" + uuid();
  return result;
}

export function genListFieldItemPartial(): Model.SDCListFieldItem {
  const temp: Model.SDCListFieldItem = {
    id: "listitem-" + shortID(),
    children: [],
    selectionDeselectsSiblings: false,
    selectionDisablesChildren: false,
  };
  return new Model.SDCListFieldItem(temp);
}

export function genListFieldItemComplete(): Model.SDCListFieldItem {
  const result = genListFieldItemPartial();
  result.order = 1;
  result.uid = uuid();
  result.title = "option " + result.id;
  return result;
}

export function genFormResponsePartial(): Model.SDCFormResponse {
  const temp: Model.SDCFormResponse = {
    formId: uuid(),
    patientID: uuid(),
    answers: [],
  };
  return new Model.SDCFormResponse(temp);
}

export function genFormResponseComplete(): Model.SDCFormResponse {
  const result = genFormResponsePartial();
  result.uid = uuid();
  result.creationTime = new Date();
  result.updateTime = new Date();
  return result;
}

export function genAnswer(): Model.SDCAnswer {
  const temp: Model.SDCAnswer = {
    questionID: shortID(),
    responses: [],
  };
  return new Model.SDCAnswer(temp);
}

export function buildSimpleList(baseId?: string): Model.SDCListField {
  const result = genListFieldComplete();
  if (baseId) result.id = baseId;

  for (let i = 0; i < 4; i++) {
    const listOption = genListFieldItemComplete();
    listOption.id = `${baseId}-${i}`;
    listOption.title = `optiont ${i}`;
    result.options.push(listOption);
  }
  return result;
}

/**
 * Generate a simple form with pretty much all optional fields missing
 */
export function buildFormPartial(): Model.SDCForm {
  const form = genFormPartial();
  form.formProperties.push(genFormPropertyPartial());
  form.formProperties.push(genFormPropertyPartial2());

  form.children.push(genDisplayItemPartial());
  const section = genSectionPartial();
  form.children.push(section);

  section.children.push(genTextFieldPartial());
  const listQuestion = genListFieldPartial();
  section.children.push(listQuestion);

  for (let i = 0; i < 4; i++) {
    const listOption = genListFieldItemPartial();
    listOption.id = `${listQuestion.id}-${i}`;
    listOption.title = `optiont ${i}`;
    listQuestion.options.push(listOption);
  }
  return form;
}

/**
 * Generate a simple form with pretty much all fields defined
 */
export function buildFormComplete(): Model.SDCForm {
  const form = genFormComplete();
  form.formProperties.push(genFormPropertyComplete());
  form.formProperties.push(genFormPropertyComplete2());

  form.children.push(genDisplayItemComplete());
  const section = genSectionComplete();
  form.children.push(section);

  const textQuestion = genTextFieldComplete();
  textQuestion.id = "text-1";
  section.children.push(textQuestion);

  const listQuestion = buildSimpleList("list-1");
  section.children.push(listQuestion);

  const listOption = genListFieldItemComplete();
  listOption.id = "list-1-t";
  listOption.textResponse = genTextFieldComplete();
  listOption.textResponse.id = "listText";
  listOption.textResponse.type = "string";
  listQuestion.options.push(listOption);
  return form;
}

/**
 * Generate a valid response to the question created by buildFormComplete
 */
export function buildFormResponsePartial(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "text-1";
  answer.responses = ["5"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "list-1";
  answer.responses = ["list-1-t"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "listText";
  answer.responses = ["response to the text field within list"];
  response.answers.push(answer);

  return response;
}

/**
 * Generate a valid response to the question created by buildFormComplete
 */
export function buildFormResponsePartial2(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "text-1";
  answer.responses = ["5"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "list-1";
  answer.responses = ["list-1-1"];
  response.answers.push(answer);

  return response;
}

export function buildFormSimpleList(): Model.SDCForm {
  const form = genFormComplete();
  form.formProperties.push(genFormPropertyComplete());
  form.formProperties.push(genFormPropertyComplete2());

  form.children.push(buildSimpleList("list"));

  return form;
}

export function buildFormResponseSimpleList(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = ["list-1"];
  response.answers.push(answer);

  return response;
}

export function buildFormOptionalQuestion(): Model.SDCForm {
  const form = buildFormSimpleList();
  findNode(form, "list").minSelections = 0;
  return form;
}

export function buildFormResponseOptionalQuestion(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = [];
  response.answers.push(answer);

  return response;
}

export function buildFormMultipleQuestion(): Model.SDCForm {
  const form = buildFormSimpleList();
  findNode(form, "list").maxSelections = 4;
  return form;
}

export function buildFormResponseMultipleQuestion(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = ["list-0", "list-1"];
  response.answers.push(answer);

  return response;
}

export function buildFormDeselectSiblings(): Model.SDCForm {
  const form = buildFormSimpleList();
  findNode(form, "list-0").selectionDeselectsSiblings = true;
  findNode(form, "list").maxSelections = 2;
  return form;
}

export function buildFormResponseDeselectSiblings1(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = ["list-0"];
  response.answers.push(answer);

  return response;
}

export function buildFormResponseDeselectSiblings2(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = ["list-1", "list-2"];
  response.answers.push(answer);

  return response;
}

export function buildFormNestedList(): Model.SDCForm {
  const form = buildFormSimpleList();

  findNode(form, "list-3").children.push(buildSimpleList("list-3-l"));
  findNode(form, "list").children.push(buildSimpleList("list-l"));

  return form;
}

export function buildFormResponseNestedList(): Model.SDCFormResponse {
  const response = genFormResponsePartial();

  let answer = genAnswer();
  answer.questionID = "list";
  answer.responses = ["list-3"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "list-3-l";
  answer.responses = ["list-3-l-3"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "list-l";
  answer.responses = ["list-l-0"];
  response.answers.push(answer);

  return response;
}

export function buildFormDeselectChildren(): Model.SDCForm {
  const form = buildFormNestedList();

  findNode(form, "list-3").selectionDisablesChildren = true;

  return form;
}

export function buildFormResponseDeselectChildren(): Model.SDCFormResponse {
  const response = buildFormResponseNestedList();

  response.answers = response.answers.filter(
    (o) => o.questionID !== "list-3-l"
  );

  return response;
}
