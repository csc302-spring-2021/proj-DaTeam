import { Model, StackUtil, ParsingError } from "@dateam/shared";
import XMLParser from "fast-xml-parser";
import he from "he";

class SDCParser {
  protected stack = new StackUtil("Root", ParsingError);

  protected xmlParserOptions = {
    attributeNamePrefix: "",
    attrNodeName: "attributes", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false, // boolean i.e. attributes with no value
    parseNodeValue: false,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "cdataTags", //default is 'false'
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

  xmlToJson(xmlData: string): any {
    const validationResult = XMLParser.validate(xmlData);
    console.log(validationResult);
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

  xmlToRawFormDesign(xmlData: string): any {
    const obj = this.xmlToJson(xmlData);
    if (!obj.FormDesign) throw this.stack.genError("Missing child: FormDesign");
    return obj.FormDesign[0];
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
    // TODO
    console.log("parseChildren called on");
    console.log(obj);
    this.result.children = obj.ChildItems; // this is just a mock
  }

  populateProperties(obj: any) {
    if (!obj.attributes.ID) throw this.stack.genError("Missing attribute: ID");
    this.result.id = obj.attributes.ID;
    this.result.title = obj.attributes.title;
    this.result.order = obj.attributes.order;
  }
}

export class FormParser extends NodeParser {
  result: Model.SDCForm;
  targeClass = Model.SDCForm;
  populateProperties(obj: any) {
    super.populateProperties(obj);
    if (obj.Header) this.result.header = obj.Header[0]["#text"].trim();
    if (obj.Footer) this.result.footer = obj.Footer[0]["#text"].trim();
    if (!obj.attributes.lineage) {
      throw this.stack.genError("Missing attribute: lineage");
    }
    this.result.lineage = obj.attributes.lineage;
    if (!obj.attributes.version) {
      throw this.stack.genError("Missing attribute: version");
    }
    this.result.version = obj.attributes.version;
    this.result.title = obj.attributes.formTitle;
    // todo: parse formProperties
  }
  parseChildren(obj: any) {
    if (!obj.Body) throw this.stack.genError("Missing child: Body");
    this.stack.enter("Body");
    super.parseChildren(obj.Body[0]);
  }
}

export class QuestionParser extends NodeParser {}

export class DisplayedItemParser extends NodeParser {
  targeClass = Model.SDCDisplayItem;
}

export class SectionParser extends NodeParser {
  targeClass = Model.SDCSection;
}

export class TextFieldParser extends QuestionParser {
  result: Model.SDCTextField;
  targeClass = Model.SDCTextField;
  populateProperties(obj: any) {
    super.populateProperties(obj);
    // check if key exists in TextAfterResponse
    if ("TextAfterResponse" in obj["ResponseField"]) {
      // textAfterResponse is stored in the attributes list of TextAfterResponse under the key "val"
      this.result.textAfterResponse =
        obj["ResponseField"]["TextAfterResponse"]["@_"]["val"];
    }
    // type is always stored after attribute key "@_" *if* it exists, which it may not
    // thus check if it exists first
    if ("@_" in obj["ResponseField"]["Response"]) {
      this.result.type = Object.keys(obj)[1];
    } else {
      this.result.type = Object.keys(obj)[0];
    }
  }
}

export class ListFieldParser extends QuestionParser {
  result: Model.SDCListField;
  targeClass = Model.SDCListField;
}

export class ListFieldItemParser extends NodeParser {
  result: Model.SDCListFieldItem;
  targeClass = Model.SDCListFieldItem;
}

export const sdcParser = new SDCParser();
