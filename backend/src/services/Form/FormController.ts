import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const FormController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  read: function (req: Request, res: Response) {
    const sdcForm = Mocks.buildFormComplete();
    const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm)

    res.status(HttpCode.OK).send(serialized);
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
    const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm)

    res.status(HttpCode.OK).send(serialized);
  }
};
