import { Model, StackUtil, ParsingError } from "@dateam/shared";
import XMLParser from "fast-xml-parser";
import he from "he";

class SDCParser {
  protected stack = new StackUtil("Root", ParsingError);

  protected xmlParserOptions = {
    attributeNamePrefix: "",
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
    arrayMode: true, //"strict"
    attrValueProcessor: (val: string, attrName: string) =>
      he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val: string, tagName: string) => he.decode(val), //default is a=>a
    stopNodes: ["Header", "Footer"], // tag names that don't need to be parsed, only passed in as a string
  };

  protected parsers: { [id: string]: new (s: StackUtil) => NodeParser } = {
    FormDesign: FormParser,
    DisplayedItem: DisplayedItemParser,
    Section: SectionParser,
    ResponseField: TextFieldParser,
    ListField: ListFieldParser,
    ListItem: ListFieldItemParser,
    Question: QuestionParser,
    ListItemResponseField: ListFieldItemParser,
  };

  protected xmlToJson(xmlData: string): any {
    const validationResult = XMLParser.validate(xmlData);
    if (validationResult !== true) throw validationResult;
    return XMLParser.parse(xmlData, this.xmlParserOptions);
  }

  xmlToSDCForm(xmlData: string): Model.SDCForm {
    const formParser = new FormParser(this.stack);
    const obj = this.xmlToJson(xmlData);
    if (!obj.FormDesign) throw this.stack.genError("Missing child: FormDesign");
    formParser.parse(obj.FormDesign[0]);
    return formParser.result;
  }
}

abstract class NodeParser {
  result: Model.SDCNode;
  stack: StackUtil;
  targeClass: new () => any;

  constructor(stack: StackUtil) {
    this.stack = stack;
  }

  parse(obj: any) {
    this.result = new this.targeClass();
    this.populateProperties(obj);
    this.parseChildren(obj);
  }

  parseChildren(obj: any) {
    console.log("parseChildren called on");
    console.log(obj);
  }

  populateProperties(obj: any) {
    if (!obj.false.ID) throw this.stack.genError("Missing attribute: ID");
    this.result.id = obj.false.ID;
    this.result.title = obj.false.title;
    this.result.order = obj.false.order;
  }
}

class FormParser extends NodeParser {
  result: Model.SDCForm;
  targeClass = Model.SDCForm;
  populateProperties(obj: any) {
    super.populateProperties(obj);
    if (obj.Header) this.result.header = obj.Header[0]["#text"].trim();
    if (obj.Footer) this.result.footer = obj.Footer[0]["#text"].trim();
    if (!obj.false.lineage) {
      throw this.stack.genError("Missing attribute: lineage");
    }
    this.result.lineage = obj.false.lineage;
    if (!obj.false.version) {
      throw this.stack.genError("Missing attribute: version");
    }
    this.result.version = obj.false.version;
    // todo: parse formProperties
  }
  parseChildren(obj: any) {
    if (!obj.Body) throw this.stack.genError("Missing child: Body");
    this.stack.enter("Body");
    super.parseChildren(obj.Body[0]);
  }
}

class QuestionParser extends NodeParser {}

class DisplayedItemParser extends NodeParser {
  targeClass = Model.SDCDisplayItem;
}

class SectionParser extends NodeParser {
  targeClass = Model.SDCSection;
}

class TextFieldParser extends QuestionParser {
  result: Model.SDCTextField;
  targeClass = Model.SDCTextField;
}

class ListFieldParser extends QuestionParser {
  result: Model.SDCListField;
  targeClass = Model.SDCListField;
}

class ListFieldItemParser extends NodeParser {
  result: Model.SDCListFieldItem;
  targeClass = Model.SDCListFieldItem;
}

export const sdcParser = new SDCParser();
