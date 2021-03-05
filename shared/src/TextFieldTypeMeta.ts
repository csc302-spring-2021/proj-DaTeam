/**
 * This file contains meta information of the textFieldType for validation purposes
 */
class TextFieldTypeMetaType{
     processor?: (base: string) => string // formate a field, e.g. strip
     parser?: (field: string) => any // validate and then parse the field
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
          parser: (t) => {
               if (!new RegExp("^-?[0-9]+$").test(t)){
                    throw new Error("Input is not a valid int")
               }
               return parseInt(t)
          },
     },
     "integer" : {
          processor: String.prototype.trim,
          parser: (t) => {
               if (!new RegExp("^-?[0-9]+$").test(t)){
                    throw new Error("Input is not a valid int")
               }
               return parseInt(t)
          },
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
