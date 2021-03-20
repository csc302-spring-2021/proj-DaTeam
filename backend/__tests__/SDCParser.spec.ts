import * as SDCParser from "../build/SDCParser/SDCParser";
import * as TestData from "./SDCTestData";
import { Model, StackUtil } from "@dateam/shared";
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
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCDisplayItem);
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
});

describe("Parse DisplayedItem", () => {});

describe("Parse Section", () => {});

describe("Parse TextField", () => {
  let result;
  let result2;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.textField);
    const obj1 = json.ResponseField[0];
    inspect(obj1);

    const json2 = SDCParser.sdcParser.xmlToJson(TestData.textField2);
    const obj2 = json2.ResponseField[0];
    inspect(obj2);

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

describe("Parse ListField", () => {});

describe("Parse ListFieldItem", () => {
  let result;
  beforeAll(() => {
    let json = SDCParser.sdcParser.xmlToJson(TestData.listFieldItem);
    const obj = json.ListItem[0];
    inspect(obj);

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
  });
  test("Children extracted", () => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBeInstanceOf(Model.SDCDisplayItem);
  });
});
