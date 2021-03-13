import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const FormController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
    const pk = req.params.formId;
    dbManager.genericRead(pk, Model.SDCForm).then((sdcForm) => {
      const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm);
      res.status(HttpCode.OK).send(serialized);
    }).catch((e) => {
      res.status(HttpCode.BAD_REQUEST).send('')
    });

  },

  read: function (req: Request, res: Response) {
    const pk = req.params.formId;
    dbManager.genericRead(pk, Model.SDCForm).then((sdcForm) => {
      const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm);
      res.status(HttpCode.OK).send(serialized);
    });
  },

  readResponses: function (req: Request, res: Response) {
    const pk = req.params.formId;
    // TODO: Search and find form responses
    dbManager.genericSearch(Model.SDCFormResponse, );
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
