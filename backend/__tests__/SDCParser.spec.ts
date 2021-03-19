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
    inspect(obj);

    const parser = new SDCParser.FormParser(new StackUtil());
    parser.parse(obj);
    result = parser.result;
  });
  test("Base info extracted", (done) => {
    expect(result).toHaveProperty(
      "id",
      "Adrenal.Bx.Res.129_3.003.001.REL_sdcFDF"
    );
    expect(result).toEqual(
      expect.objectContaining({
        title: "ADRENAL GLAND",
        lineage: "Adrenal.Bx.Res.129",
        version: "3.003.001.REL",
      })
    );
    expect(result).toHaveProperty("footer");
    done();
  });
  test("Form properties extracted", (done) => {
    expect(result).toHaveProperty("formProperties");
    expect(result.formProperties).toHaveLength(1);
    done();
  });
  test("Children extracted", (done) => {
    expect(result).toHaveProperty("children");
    expect(result.children).toHaveLength(1);
    expect(result.children[0] instanceof Model.SDCDisplayItem).toEqual(true);
    done();
  });
});

describe("Parse Question", () => {});

describe("Parse DisplayedItem", () => {});

describe("Parse Section", () => {});

describe("Parse TextField", () => {});

describe("Parse ListField", () => {});

describe("Parse ListFieldItem", () => {});
