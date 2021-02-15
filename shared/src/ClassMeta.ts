/*   This file contains meta information of the domain objects
     Primarily for parsing and validation purposes
 */

import * as Model from "./ClassDef"

class TextFieldTypeMetaType{
     processor?: (base: string) => string // formate a field, e.g. strip
     validator?: (field: string) => boolean // validate the field
}

// TODO
export const textFieldTypeMeta: { [id: string]: TextFieldTypeMetaType } = {
     "anyType" : {},
     "anyURI" : {},
     "base64Binary" : {},
     "boolean" : {},
     "duration" : {},
     "ID" : {
          processor: String.prototype.trim
     },
     "int" : {
          processor: String.prototype.trim,
          validator: new RegExp("^-?[0-9]*$").test
     },
     "integer" : {
          processor: String.prototype.trim,
          validator: new RegExp("^-?[0-9]*$").test
     },
     "byte" : {},
     "date" : {},
     "dateTime" : {},
     "dateTimeStamp" : {},
     "decimal" : {},
     "double" : {},
     "float" : {},
     "gDay" : {},
     "gMonth" : {},
     "gMonthDay" : {},
     "gYear" : {},
     "gYearMonth" : {},
     "hexBinary" : {},
     "HTML" : {},
     "long" : {},
     "negativeInteger" : {},
     "NMTOKENS" : {},
     "nonNegativeInteger" : {},
     "nonPositiveInteger" : {},
     "positiveInteger" : {},
     "short" : {},
     "string" : {},
     "time" : {},
     "unsignedByte" : {},
     "unsignedInt" : {},
     "unsignedLong" : {},
     "unsignedShort" : {},
     "XML" : {},
     "yearMonthDuration" : {}
}

class ClassMetaType{
     super?: Function
     construct?: { new(data?: any): Object}
     fields: { [id: string] : FieldMetaType }
}

class FieldMetaType{
     type: { new(): Object} // type should only be String, Number, Boolean, Array, Object
     generic?: Function
     nullable?: boolean // default false
     validator?: (obj: any) => boolean // takes the whole object as input
}

// TODO
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
                    validator: o => { return o.order >= 0 }
               },
               children: {
                    type: Array,
                    generic: Model.SDCNode
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
                    validator: o => { return o.order >= 0 }
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
                    validator: o => { return textFieldTypeMeta[o.type] != null }
               }
          }
     },
     SDCListField: {
          super: Model.SDCQuestion,
          construct: Model.SDCListField,
          fields: {
               minSelections: {
                    type: Number,
                    validator: o => { return o.minSelections >= 0 }
               },
               maxSelections: {
                    type: Number,
                    validator: o => { return o.maxSelections >= o.minSelections }
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
