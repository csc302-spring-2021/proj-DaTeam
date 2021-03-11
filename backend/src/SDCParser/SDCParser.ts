import XMLParser from "fast-xml-parser";
import he from "he";

class SDCParser{
  xmlParserOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "false", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false, // boolean i.e. attributes with no value
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "false", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val: string, attrName: string) =>
      he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val: string, tagName: string) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"], // tag names that don't need to be parsed, only passed in as a string
  };

  xmlToJson(xmlData: string): any{
    const validationResult = XMLParser.validate(xmlData)
    if (validationResult !== true) throw validationResult
    return XMLParser.parse(xmlData, this.xmlParserOptions)
  }

  
}



