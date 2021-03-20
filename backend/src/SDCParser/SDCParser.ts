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

  xmlToJson(xmlData: string): any {
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
    if (!obj.ChildItems) return;
    const children = obj.ChildItems[0];
    this.stack.enter("ChildItems");
    for (let key of Object.keys(children)) {
      if (parsers[key] == null) continue;
      this.stack.enter(key);
      for (let child of children[key]) {
        const parser = new parsers[key](this.stack);
        parser.parse(child);
        this.result.children.push(parser.result);
      }
      this.stack.enter(key);
    }
    this.stack.leave();
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
    this.stack.leave();
  }
}

export class QuestionParser extends NodeParser {
  parse(obj: any) {
    let subField: string;
    if (obj.ResponseField && obj.ListField) {
      throw this.stack.genError(
        "Question cannot contain both ResponseField and ListField"
      );
    } else if (obj.ResponseField) {
      subField = "ResponseField";
    } else if (obj.ListField) {
      subField = "ListField";
    } else {
      throw this.stack.genError(
        "Question has no child ResponseField nor ListField"
      );
    }
    const subParser = new parsers[subField](this.stack);
    this.stack.enter(subField);
    subParser.parse(obj[subField][0]);
    this.result = subParser.result;
    this.stack.leave();
    this.populateProperties(obj);
    this.parseChildren(obj);
  }
}

export class DisplayedItemParser extends NodeParser {
  targeClass = Model.SDCDisplayItem;
}

export class SectionParser extends NodeParser {
  targeClass = Model.SDCSection;
}

export class TextFieldParser extends QuestionParser {
  result: Model.SDCTextField;
  targeClass = Model.SDCTextField;
  parse(obj: any) {
    this.result = new this.targeClass();
    // check if key exists in TextAfterResponse
    if (
      "TextAfterResponse" in obj &&
      obj["TextAfterResponse"][0]["attributes"]
    ) {
      // textAfterResponse is stored in the attributes list of TextAfterResponse under the key "val"
      this.result.textAfterResponse =
        obj["TextAfterResponse"][0]["attributes"]["val"];
    }
    // type is always stored after attribute key "attributes" *if* it exists, which it may not
    // thus check if it exists first
    for (let type of Object.keys(obj.Response[0])) {
      if (type === "attributes") continue;
      if (this.result.type)
        throw this.stack.genError("Response contains multiple children");
      this.result.type = type;
    }
    if (!this.result.type) throw this.stack.genError("Missing child: type");
  }
}

export class ListFieldParser extends QuestionParser {
  result: Model.SDCListField;
  targeClass = Model.SDCListField;
}

export class ListFieldItemParser extends NodeParser {
  result: Model.SDCListFieldItem;
  targeClass = Model.SDCListFieldItem;
  parse(obj: any) {
    this.result = new this.targeClass();
    if (
      "selectionDisablesChildren" in Object.keys(obj.ListItem[0].attributes)
    ) {
    }
  }
  parseChildren(obj: any) {}
}

export const sdcParser = new SDCParser();

const parsers: { [id: string]: new (s: StackUtil) => NodeParser } = {
  FormDesign: FormParser,
  DisplayedItem: DisplayedItemParser,
  Section: SectionParser,
  ResponseField: TextFieldParser,
  ListField: ListFieldParser,
  ListItem: ListFieldItemParser,
  Question: QuestionParser,
  ListItemResponseField: ListFieldItemParser,
};
