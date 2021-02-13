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
     super?: string
     construct?: { new(data?: any): Object}
     fields: { [id: string] : FieldMetaType }
}

class FieldMetaType{
     type: string
     generic?: string
     nullable?: boolean // default false
     validator?: (obj: any) => boolean // takes the whole object as input
}

// TODO
export const classMeta: { [id: string]: ClassMetaType } = {
     "SDCNode":{
          // No constructor
          fields: {
               "id": {
                    type: "String"
               },
               "uid": {
                    type: "String"
               },
               "title": {
                    type: "String",
                    nullable: true
               },
               "order": {
                    type: "Number",
                    nullable: true,
                    validator: o => { return o.order >= 0 }
               },
               "children": {
                    type: "Array",
                    "generic": "SDCNode"
               },
               "minSelections": {
                    type: "Number",
                    validator: o => { return o.minSelections >= 0 }
               },
               "maxSelections": {
                    type: "Number",
                    validator: o => { return o.maxSelections >= o.minSelections }
               }
          }
     },
     "SDCForm": {
          super: "SDCItem",
          construct: Model.SDCForm,
          fields: {
               "lineage": {
                    type: "String"
               },
               "version": {
                    type: "String"
               },
               "header": {
                    type: "String",
                    nullable: true
               },
               "footer": {
                    type: "String",
                    nullable: true
               },
               "formProperties": {
                    type: "Array",
                    generic: "SDCFormProperty"
               }
          }
     },
     "SDCFormProperty": {
          construct: Model.SDCFormProperty,
          fields: {
               "order": {
                    type: "number",
                    nullable: true,
                    validator: o => { return o.order >= 0 }
               },
               "name": {
                    type: "string",
               },
               "propName": {
                    type: "string",
               },
               "val": {
                    type: "string",
               },
          }
     }
}