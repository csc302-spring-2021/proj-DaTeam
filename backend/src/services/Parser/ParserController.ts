import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { sdcParser } from "../../SDCParser";

export const ParseController = {
  parse: function (req: Request, res: Response) {
    console.log(req.body.toString());
    const form = sdcParser.xmlToSDCForm(req.body.toString());
    const serialized = GenericJsonSerializer.encode(form, Model.SDCForm);

    res.status(HttpCode.OK).send(serialized);
  },
};
