import { SDCForm } from "@dateam/shared/src/ClassDef";
import { buildFormComplete } from "@dateam/shared/src/MockData";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const FormController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  read: function (req: Request, res: Response) {
    const sdcForm: SDCForm = buildFormComplete();

    //res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    res.status(HttpCode.OK).send(sdcForm);
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },
};
