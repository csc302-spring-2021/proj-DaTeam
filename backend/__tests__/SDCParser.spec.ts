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

describe("Parse Question", () => {});

describe("Parse DisplayedItem", () => {});

describe("Parse Section", () => {});

describe("Parse TextField", () => {
  let result;
  let result2;
  beforeAll(() => {
    const json = SDCParser.sdcParser.xmlToJson(TestData.textField);
    inspect(json);

    const json2 = SDCParser.sdcParser.xmlToJson(TestData.textField2);
    inspect(json2);

    const parser = new SDCParser.TextFieldParser(new StackUtil());
    parser.parse(json);
    result = parser.result;

    parser.parse(json2);
    result2 = parser.result;
    test("Extracted textAfterResponse", () => {
      expect(result).toHaveProperty("textAfterResponse", "cm");
    });
    test("Extracted type", () => {
      expect(result).toHaveProperty("type", "decimal");
    });
    test("Extracted type in edge case", () => {
      expect(result2).toHaveProperty("type", "string");
    });
  });
});

describe("Parse ListField", () => {});

describe("Parse ListFieldItem", () => {});
