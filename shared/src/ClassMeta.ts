/*   This file contains meta information of the domain objects
     Primarily for parsing and validation purposes
 */

import * as Model from "./ClassDef"
import { textFieldTypeMeta } from "./TextFieldTypeMeta"

class ClassMetaType{

     /** Super class of this class */
     super?: Function

     /** Constructor of this class */
     construct?: { new(data?: any): Object}

     /** All fields contain in this class */
     fields: { [id: string] : FieldMetaType }
}

class FieldMetaType{

     /**
      * Basic type of this field, should only be `String`, `Number`, `Boolean`, `Array`, `Object`
      *
      * If the type of the field is a custom object, use `Object` here
      */
     type: { new(): Object}

     /**
      * Generic type of this field if `type` is `Array`,
      *
      * or the actual type of the field if `type` is `Object`
      */
     generic?: Function

     /** Default to false */
     nullable?: boolean

     /** Validator of this field, the input is the entire object, not just the field */
     validator?: (obj: any) => void
}

/** Dictionary containing class meta info */
export const classMeta: { [id: string]: ClassMetaType } = {
     Procedure:{
          construct: Model.Procedure,
          fields: {
               uid: {
                    type: String,
                    nullable: true
               },
               id: {
                    type: String,
               },
               assignedFormID: {
                    type: String,
                    nullable: true
               }
          }
     },
     Patient:{
          construct: Model.Patient,
          fields: {
               uid: {
                    type: String,
                    nullable: true
               },
               id: {
                    type: String,
               },
               name: {
                    type: String
               }
          }
     },
     SDCNode:{
          // No constructor
          fields: {
               id: {
                    type: String
               },
               uid: {
                    type: String,
                    nullable: true
               },
               title: {
                    type: String,
                    nullable: true
               },
               order: {
                    type: Number,
                    nullable: true,
                    validator: o => { if (o.order < 0) throw new Error("order cannot be negetive") }
               },
               children: {
                    type: Array,
                    generic: Model.SDCNode,
                    validator: o => {
                         for (let child of o.children){
                              if (child instanceof Model.SDCForm){
                                   throw new Error("SDCForm cannot be a child")
                              }
                         }
                    }
               }
          }
     },
     SDCQuestion:{
          // No constructor
          super: Model.SDCNode,
          fields: {}
     },
     SDCForm: {
          super: Model.SDCNode,
          construct: Model.SDCForm,
          fields: {
               lineage: {
                    type: String
               },
               version: {
                    type: String
               },
               header: {
                    type: String,
                    nullable: true
               },
               footer: {
                    type: String,
                    nullable: true
               },
               formProperties: {
                    type: Array,
                    generic: Model.SDCFormProperty
               }
          }
     },
     SDCFormProperty: {
          construct: Model.SDCFormProperty,
          fields: {
               order: {
                    type: Number,
                    nullable: true,
                    validator: o => { if (o.order < 0) throw new Error("order cannot be negetive") }
               },
               name: {
                    type: String,
               },
               propName: {
                    type: String,
               },
               val: {
                    type: String,
               },
          }
     },
     SDCSection: {
          super: Model.SDCNode,
          construct: Model.SDCSection,
          fields: {}
     },
     SDCDisplayItem: {
          super: Model.SDCNode,
          construct: Model.SDCDisplayItem,
          fields: {}
     },
     SDCTextField: {
          super: Model.SDCQuestion,
          construct: Model.SDCTextField,
          fields: {
               textAfterResponse: {
                    type: String,
                    nullable: true,
               },
               type: {
                    type: String,
                    validator: o => {
                         if (textFieldTypeMeta[o.type] == null){
                              throw new Error(o.type + " is not a valid TextFieldType")
                         }
                    }
               }
          }
     },
     SDCListField: {
          super: Model.SDCQuestion,
          construct: Model.SDCListField,
          fields: {
               minSelections: {
                    type: Number,
                    validator: o => {
                         if (o.minSelections < 0){
                              throw new Error("minSelections cannot be negetive")
                         }
                    }
               },
               maxSelections: {
                    type: Number,
                    validator: o => {
                         if (o.maxSelections < o.minSelections){
                              throw new Error("maxSelections must be greater than minSelections")
                         }
                    }
               },
               options: {
                    type: Array,
                    generic: Model.SDCListFieldItem
               },
               lookupEndPoint: {
                    type: String,
                    nullable: true
               }
          }
     },
     SDCListFieldItem: {
          super: Model.SDCNode,
          construct: Model.SDCListFieldItem,
          fields: {
               textResponse: {
                    type: Object,
                    generic: Model.SDCTextField,
                    nullable: true
               },
               selectionDeselectsSiblings: {
                    type: Boolean
               },
               selectionDisablesChildren: {
                    type: Boolean
               }
          }
     },
     SDCFormResponse: {
          construct: Model.SDCFormResponse,
          fields: {
               uid: {
                    type: String,
                    nullable: true
               },
               formId: {
                    type: String
               },
               patientID: {
                    type: String
               },
               answers: {
                    type: Array,
                    generic: Model.SDCAnswer
               }
          }
     },
     SDCAnswer: {
          construct: Model.SDCAnswer,
          fields: {
               questionID: {
                    type: String
               },
               responses: {
                    type: Array,
                    generic: String
               }
          }
     }
}
