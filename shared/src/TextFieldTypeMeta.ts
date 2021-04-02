/**
 * This file contains meta information of the textFieldType for validation purposes
 */
class TextFieldTypeMetaType {
  processor?: (base: string) => string; // formate a field, e.g. strip
  parser?: (field: string) => any; // validate and then parse the field
}

// Helpers
function just<T>(o: T): T {
  return o;
}

/** Test for regex then call the parser */
function test(
  regex: RegExp,
  parser: (field: string) => any = just
): (field: string) => any {
  return (field: string) => {
    if (!regex.test(field)) throw new Error("Input format is invalid");
    return parser(field);
  };
}

/** Parse the date */
function parseDate(val: string) {
  return new Date(val);
}

/** Create `RegExp` that matches the entire `reg` expression */
function match(reg: string, option?: string) {
  return new RegExp(`^reg$`, option);
}

const yearReg = "(19|20)[0-9]{2}";
const numMonthReg = "(0?[1-9]|1[0-2])";
const monthReg = `(${numMonthReg}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)`;
const dayReg = "(0?[1-9]|[12][0-9]|3[01])";
const dateSepReg = "[ -/]";
const timeReg = "((0|1|)[0-9]|2[0-3]):[0-5]?[0-9](:[0-5]?[0-9](.[0-9]+)?)?";

export const textFieldTypeMeta: { [id: string]: TextFieldTypeMetaType } = {
  anyType: { processor: just }, // pass
  anyURI: {
    parser: test(
      /^(([^:\/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    ), // RFC 3986
  },
  base64Binary: {
    parser: test(/^(?:[a-z0-9+/]{4})*(?:[a-z0-9+/]{2}==|[a-z0-9+/]{3}=)?$/i),
  },
  boolean: {
    processor: (t) => {
      if (/^(true|1|yes)$/i.test(t)) return "1";
      if (/^(false|0|no)$/i.test(t)) return "0";
      return t;
    },
    parser: (t) => {
      if (t === "1") return true;
      if (t === "0") return false;
      throw new Error("Input format is invalid");
    },
  },
  duration: {
    parser: test(
      /^P([0-9]+Y)?([0-9]+M)?([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+S)?)?$/
    ),
  }, // parser todo
  ID: { parser: test(/^[a-z0-9-]*$/i) },
  int: { parser: test(/^[+-]?[0-9][1-9]*$/, parseInt) },
  integer: { parser: test(/^[+-]?[0-9][1-9]*$/, parseInt) },
  byte: { parser: test(/^[+-]?(0|1|)[0-9]{1,2}$/, parseInt) },
  date: {
    parser: test(
      match(`(${yearReg}${dateSepReg})?${monthReg}${dateSepReg}${dayReg}`, "i"),
      parseDate
    ),
  },
  dateTime: {
    parser: test(
      match(
        `(${yearReg}${dateSepReg})?${monthReg}${dateSepReg}${dayReg} ${timeReg}`,
        "i"
      ),
      parseDate
    ),
  },
  dateTimeStamp: {
    parser: test(
      match(`${yearReg}-${numMonthReg}-${dayReg}T${timeReg}Z`),
      parseDate
    ),
  },
  decimal: { parser: test(/^[+-]?([0-9][1-9]*[.])?[0-9]+$/, parseFloat) },
  double: { parser: test(/^[+-]?([0-9][1-9]*[.])?[0-9]+$/, parseFloat) },
  float: { parser: test(/^[+-]?([0-9][1-9]*[.])?[0-9]+$/, parseFloat) },
  gDay: { parser: test(match(dayReg, "i"), parseDate) },
  gMonth: { parser: test(match(monthReg, "i"), parseDate) },
  gMonthDay: {
    parser: test(match(monthReg + dateSepReg + dayReg, "i"), parseDate),
  },
  gYear: { parser: test(match(yearReg, "i"), parseDate) },
  gYearMonth: {
    parser: test(match(yearReg + dateSepReg + monthReg, "i"), parseDate),
  },
  hexBinary: { parser: test(/^(0x)?[0-9a-f]+$/i) },
  HTML: { parser: test(/^(<\/?[^<>]+>)+$/) },
  long: { parser: test(/^[+-]?[0-9][1-9]*$/, parseInt) },
  negativeInteger: { parser: test(/^-[1-9]*$/, parseInt) },
  NMTOKENS: { parser: test(/^[a-zA-Z0-9._\\-:]*$/) },
  nonNegativeInteger: { parser: test(/^[+]?[0-9][1-9]*$/, parseInt) },
  nonPositiveInteger: { parser: test(/^(0|-[0-9][1-9]*)$/, parseInt) },
  positiveInteger: { parser: test(/^+?[1-9]*$/, parseInt) },
  short: { parser: test(/^[+-]?[0-9][1-9]*$/, parseInt) },
  string: { processor: just }, // pass
  time: { parser: test(match(timeReg, "i")) }, // parser todo
  unsignedByte: { parser: test(/^(0|1|2|)[0-9]{1,2}$/, parseInt) },
  unsignedInt: { parser: test(/^[0-9][1-9]*$/, parseInt) },
  unsignedLong: { parser: test(/^[0-9][1-9]*$/, parseInt) },
  unsignedShort: { parser: test(/^[0-9][1-9]*$/, parseInt) },
  XML: { parser: test(/^(<\/?[^<>]+>)+$/) },
  yearMonthDuration: { parser: test(/^P([0-9]+Y)?([0-9]+M)?$/) }, // parser todo
};
