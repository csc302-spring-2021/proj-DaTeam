/**
 * This file contains valid mock date for all domain objects
 * complete means the object is fully complete
 * partial means the optional fields of the object are all empty
 * The validity of the objects are directly guranteed by the complier
 * All functions begin with gen only generate a single object
 * All functions begin with build will generate a complex
 */
import * as Model from "./ClassDef";
import { v4 as uuid } from "uuid";

const shortID = () => {
  return uuid().substr(0, 6);
};

export function genProcedurePartial(): Model.Procedure {
  const temp: Model.Procedure = {
    id: shortID(),
  };
  return new Model.Procedure(temp);
}

export function genProcedureComplete(): Model.Procedure {
  const result = genProcedurePartial();
  result.uid = uuid();
  result.assignedFormID = uuid();
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
    listOption.id = `${listOption.id}${i}`;
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
  form.uid = "5d5bb199-59e2-400e-9f16-2d1d4d0db106";
  form.formProperties.push(genFormPropertyComplete());
  form.formProperties.push(genFormPropertyComplete2());

  form.children.push(genDisplayItemComplete());
  const section = new Model.SDCSection(genSectionComplete());
  form.children.push(section);

  const textQuestion = genTextFieldComplete();
  textQuestion.id = "text-1";
  section.children.push(textQuestion);

  const listQuestion = genListFieldComplete();
  listQuestion.id = "list-1";
  section.children.push(listQuestion);

  for (let i = 0; i < 4; i++) {
    const listOption = genListFieldItemComplete();
    listOption.id = "list-1-" + i;
    listQuestion.options.push(listOption);
  }

  const listOption = genListFieldItemComplete();
  listOption.id = "list-1-t";
  listOption.textResponse = genTextFieldComplete();
  listOption.textResponse.id = "listText";
  listQuestion.options.push(listOption);
  return form;
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
  return result;
}

export function genAnswer(): Model.SDCAnswer {
  const temp: Model.SDCAnswer = {
    questionID: shortID(),
    responses: [],
  };
  return new Model.SDCAnswer(temp);
}

/**
 * Generate a valid response to the question created by buildFormComplete
 */
export function buildFormResponseComplete(): Model.SDCFormResponse {
  const response = genFormResponseComplete();
  response.formId = "5d5bb199-59e2-400e-9f16-2d1d4d0db106";

  let answer = genAnswer();
  answer.questionID = "text-1";
  answer.responses = ["5"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "list-1";
  answer.responses = ["list-1-t", "list-1-1", "list-1-2"];
  response.answers.push(answer);

  answer = genAnswer();
  answer.questionID = "listText";
  answer.responses = ["response to the text field within list"];
  response.answers.push(answer);

  return response;
}
