import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { json, Request, Response } from "express";
import { Http } from "winston/lib/winston/transports";
import { HttpCode } from "../../utils/Error";

var parser = require("fast-xml-parser");
var he = require("he");
var options = {
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

export const FormController = {
  /**
   * Returns the raw JSON of the parsed xml
   * @param xmlData: XML string to parse
   * @returns JSON object representing parsed xml file
   */
  parseXML: function (xmlData: string) {
    if (parser.validate(xmlData) === true) {
      return parser.parse(xmlData, options);
    } else {
      return null;
    }
  },

  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  read: function (req: Request, res: Response) {
    const sdcForm = this.parseXML(req.body);
    if (sdcForm === null) {
      res.status(HttpCode.BAD_REQUEST).send();
    } else {
      const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm);
      res.status(HttpCode.OK).send(serialized);
    }
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  parse: function (req: Request, res: Response) {
    const sdcForm = Mocks.buildFormComplete();
    const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm);

    res.status(HttpCode.OK).send(serialized);
  },
};
