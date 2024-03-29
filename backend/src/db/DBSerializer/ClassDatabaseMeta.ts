import {
  ClassDatabaseMetaType,
  nothing,
  just,
  remap,
  refForChild,
  childRef,
  ChildRef,
  RefForChild,
} from "./DatabaseMetaInterface";
import { Model, classMeta } from "@dateam/shared";

/** Dictionary containing database meta info */
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
      children: refForChild("uid", Model.SDCNode, "parentId"),
    },
  },
  SDCForm: {
    pk: "uid",
    table: "form",
    fields: {
      uid: just,
      formProperties: refForChild("uid", Model.SDCFormProperty, "formId"),
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
      options: refForChild("uid", Model.SDCListFieldItem, "listId"),
    },
  },
  SDCListFieldItem: {
    pk: "uid",
    table: "listFieldItem",
    fields: {
      uid: just,
      listId: just,
      textResponse: childRef("textResponse", Model.SDCTextField, "uid"),
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
      answers: refForChild("uid", Model.SDCAnswer, "responseId"),
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

function metaIntegretyCheck() {
  for (let className of Object.keys(classDatabaseMeta)) {
    const dm = classDatabaseMeta[className];
    const cm = classMeta[className];
    if (cm == null) throw new Error(`${className} not defined in classMeta`);
    for (let id of Object.keys(dm.fields)) {
      if (dm.fields[id] instanceof ChildRef) {
        if (cm.fields[id].type !== Object || cm.fields[id].generic === null) {
          throw new Error(`${className}.${id} cannot be ChildRef`);
        }
      } else if (dm.fields[id] instanceof RefForChild) {
        if (cm.fields[id].generic === null) {
          throw new Error(`${className}.${id} cannot be RefForChild`);
        }
      }
    }
  }
  for (let className of Object.keys(classMeta)) {
    const cm = classMeta[className];
    if (cm.super == null) continue;
    const dm = classDatabaseMeta[className];
    if (dm) {
      if (dm.pk == null) {
        throw new Error(
          `${className} must have pk defined because it is a subclass`
        );
      }
    }
    const sdm = classDatabaseMeta[cm.super.name];
    if (sdm == null) continue;
    for (let field of ["classColumn", "classMapper", "pk"]){
      if ((sdm as any)[field] == null){
        throw new Error(
          `${cm.super.name} must have ${field} defined because it is a super class`
        );
      }
    }
    if (
      cm.construct &&
      Object.keys(sdm.classMapper!).every((o) => {
        return sdm.classMapper![o].name !== className;
      })
    ) {
      throw new Error(
        `${className} is not mapped in ${cm.super.name}.classMapper`
      );
    }
  }
}

try {
  metaIntegretyCheck();
} catch (e) {
  throw new Error("ClassDatabaseMeta integrety check failed: " + e.message);
}
console.log("ClassDatabaseMeta integrety check clear");
