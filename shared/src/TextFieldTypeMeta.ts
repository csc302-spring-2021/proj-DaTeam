/**
 * This file contains meta information of the textFieldType for validation purposes
 */
class TextFieldTypeMetaType{
     processor?: (base: string) => string // formate a field, e.g. strip
     parser?: (field: string) => any // validate the field
     pattern?: (base: string) => string
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
          parser: (t) => { let re = new RegExp("^-?[0-9]*$"); return re.test(t) },
     },
     "integer" : {
          processor: String.prototype.trim,
          parser: (t) => { let re = new RegExp("^-?[0-9]*$"); return re.test(t) },
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
