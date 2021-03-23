import * as SDCParser from "../build/SDCParser/SDCParser";
import * as TestData from "./SDCTestData";
import { Model, StackUtil, GenericClassValidator } from "@dateam/shared";
import util from "util";

const log = console.log;

// const inspect = (o) => {} disable logging object
const inspect = (o) => {
  log(util.inspect(o, false, null, true));
};

describe("Parse Form", () => {
  let result;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.form);
    const obj = json.FormDesign[0];
    const parser = new SDCParser.FormParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Base info extracted", () => {
    expect(result).toEqual(
      expect.objectContaining({
        id: "Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF",
        title: "ADRENAL GLAND",
        lineage: "Adrenal.Bx.Res.129",
        version: "3.003.001.REL",
      })
    );
    expect(result).toHaveProperty("footer");
  });
  test("Form properties extracted", () => {
    expect(result).toHaveProperty("formProperties");
    expect(result.formProperties).toHaveLength(1);
    expect(result.formProperties[0]).toBeInstanceOf(Model.SDCFormProperty);
    expect(result.formProperties[0]).toEqual(
      expect.objectContaining({
        order: 1,
        name: "Copyright",
        propName: "Copyright",
        val:
          "(c) 2019 College of American Pathologists.  All rights reserved.  License required for use.",
      })
    );
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCDisplayItem);
  });
  test("Validator test", () => {
    GenericClassValidator.validate(result);
  });
});

describe("Parse Text Question", () => {
  let result;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.questionTest);
    const obj = json.Question[0];

    const parser = new SDCParser.QuestionParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Base info extracted", () => {
    expect(result).toEqual(
      expect.objectContaining({
        order: 82,
        id: "59852.100004300",
        title: "Histologic Type (Notes C through E)",
      })
    );
  });
  test("Text field extracted", () => {
    expect(result).toBeInstanceOf(Model.SDCTextField);
    expect(result).toEqual(
      expect.objectContaining({
        textAfterResponse: "cm",
        type: "decimal",
      })
    );
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCDisplayItem);
  });
  test("Validator test", () => {
    GenericClassValidator.validate(result);
  });
});

describe("Parse List Question", () => {
  let result;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.questionList);
    const obj = json.Question[0];

    const parser = new SDCParser.QuestionParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Base info extracted", () => {
    expect(result).toEqual(
      expect.objectContaining({
        order: 82,
        id: "59852.100004300",
        title: "Histologic Type (Notes C through E)",
      })
    );
  });
  test("List field extracted", () => {
    expect(result).toBeInstanceOf(Model.SDCListField);
    expect(result).toEqual(
      expect.objectContaining({
        minSelections: 1,
        maxSelections: 1,
      })
    );
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCTextField);
  });
  test("Validator test", () => {
    GenericClassValidator.validate(result);
  });
});

describe("Parse DisplayedItem", () => {
  let result, obj;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.displayedItem);
    obj = json.DisplayedItem[0];
    const parser = new SDCParser.DisplayedItemParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Extracted Basic Info", () => {
    // Verify Type
    expect(result).toBeInstanceOf(Model.SDCDisplayItem);
    // Verify ID
    let expectedId = obj.attributes.ID;
    expect(result).toHaveProperty("id", expectedId);
    // Verify Order
    let expectedOrder = parseInt(obj.attributes.order, 10);
    expect(result).toHaveProperty("order", expectedOrder);

    // Verify Title
    let expectedTitle = obj.attributes.title;
    expect(result).toHaveProperty("title", expectedTitle);
  });
});

describe("Parse Section", () => {
  let result, obj;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.section);
    obj = json.Section[0];
    const parser = new SDCParser.SectionParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Extracted Basic Info", () => {
    // Verify Type
    expect(result).toBeInstanceOf(Model.SDCSection);
    // Verify ID
    let expectedId = obj.attributes.ID;
    expect(result).toHaveProperty("id", expectedId);
    // Verify Order
    let expectedOrder = parseInt(obj.attributes.order, 10);
    expect(result).toHaveProperty("order", expectedOrder);

    // Verify Children length
    let numChildren = obj.ChildItems.length;
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(numChildren);
    expect(result.children[0]).toBeInstanceOf(Model.SDCQuestion);
  });
});

describe("Parse TextField", () => {
  let result;
  let result2;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.textField);
    const obj1 = json.ResponseField[0];

    const json2 = SDCParser.sdcParser.xmlToJson(TestData.textField2);
    const obj2 = json2.ResponseField[0];

    const parser = new SDCParser.TextFieldParser(new StackUtil());
    parser.parse(obj1);
    result = parser.result;

    parser.parse(obj2);
    result2 = parser.result;
  });
  test("Extracted basic info", () => {
    expect(result).toEqual(
      expect.objectContaining({
        textAfterResponse: "cm",
        type: "decimal",
      })
    );
  });
  test("Extracted type from TextField without textAfterResponse", () => {
    expect(result2).toHaveProperty("type", "string");
  });
});

describe("Parse ListField main", () => {
  let result;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.listField);
    const obj = json.ListField[0];

    const parser = new SDCParser.ListFieldParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });

  test("Extracted basic info", () => {
    expect(result).toEqual(
      expect.objectContaining({
        maxSelections: 1,
        minSelections: 0,
      })
    );
  });
  test("Extracted options", () => {
    expect(result).toHaveProperty("options");
    expect(result.options).toHaveLength(2);
    expect(result.options[0]).toBeInstanceOf(Model.SDCListFieldItem);
    expect(result.options[1]).toBeInstanceOf(Model.SDCListFieldItem);
    GenericClassValidator.validate(result.options[0]);
    GenericClassValidator.validate(result.options[1]);
  });
});

describe("Parse ListFieldItem", () => {
  let result;
  beforeAll(() => {
    let json = SDCParser.sdcParser.xmlToJson(TestData.listFieldItem);
    const obj = json.ListItem[0];

    const parser = new SDCParser.ListFieldItemParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Extracted basic info", () => {
    expect(result).toEqual(
      expect.objectContaining({
        selectionDeselectsSiblings: true,
        selectionDisablesChildren: true,
      })
    );
  });
  test("Text field extracted", () => {
    expect(result).toHaveProperty("textResponse");
    expect(result.textResponse).toBeInstanceOf(Model.SDCTextField);
    GenericClassValidator.validate(result.textResponse);
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCDisplayItem);
    GenericClassValidator.validate(result.children[0]);
  });
});
