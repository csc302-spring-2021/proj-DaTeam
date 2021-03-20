import { GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import { sdcParser } from "../../SDCParser";

export const ParseController = {
  parse: function (req: Request, res: Response) {
    try {
      const form = sdcParser.xmlToSDCForm(req.body.toString());
      const serialized = GenericJsonSerializer.encode(form, Model.SDCForm);
      res.status(HttpCode.OK).send(serialized);
    } catch (e) {
      sendError(res, HttpCode.BAD_REQUEST, e);
    }
  },
};
