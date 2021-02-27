import {
  ClassDatabaseMetaType,
  nothing,
  just,
  remap,
  refToChild,
  childRef,
} from "./DatabaseMetaInterface";
import { Model } from "@dateam/shared";

export const classDatabaseMeta: { [id: string]: ClassDatabaseMetaType } = {
  Procedure: {
    pk: "uid",
    table: "procedure",
    fields: {
      /** All fields in ClassMeta are by default `just` */
    },
  },
  Patient: {
    pk: "uid",
    table: "patient",
    fields: {},
  },
  SDCNode: {
    pk: "uid",
    table: "item",
    classColumn: "itemType",
    classMapper: {
      form: Model.SDCForm,
      displayItem: Model.SDCDisplayItem,
      section: Model.SDCSection,
      listField: Model.SDCListField,
      listFieldItem: Model.SDCListFieldItem,
      textField: Model.SDCTextField,
    },
    fields: {
      parentId: just, // db save temp field needs to be specified
      order: remap("displayOrder"),
      children: refToChild("uid", "parentId"),
    },
  },
  SDCForm: {
    pk: "uid",
    table: "form",
    fields: {
      uid: just,
      formProperties: refToChild("uid", "formId"),
    },
  },
  SDCFormProperty: {
    table: "formProperty",
    fields: {
      formId: just,
      order: remap("displayOrder"),
    },
  },
  SDCListField: {
    pk: "uid",
    table: "listField",
    fields: {
      uid: just,
      options: refToChild("uid", "listId"),
    },
  },
  SDCListFieldItem: {
    pk: "uid",
    table: "listFieldItem",
    fields: {
      uid: just,
      listId: just,
      textResponse: childRef("uid"),
    },
  },
  SDCTextField: {
    pk: "uid",
    table: "textField",
    fields: {
      uid: just,
      type: remap("fieldType"),
    },
  },
  SDCFormResponse: {
    pk: "uid",
    table: "formResponse",
    fields: {
      answers: refToChild("uid", "responseId"),
    },
  },
  SDCAnswer: {
    table: "answer",
    fields: {
      responseId: just,
      response: just,
      responses: nothing,
    },
  },
};
