import { Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import * as Utils from "../ControllerUtils";

export const FormController = {
  create: function (req: Request, res: Response) {
    Utils.create(req, res, Model.SDCForm).catch((e) =>
      sendError(res, HttpCode.BAD_REQUEST, e)
    );
  },

  read: function (req: Request, res: Response) {
    Utils.read(req, res, Model.SDCForm, "formId").catch((e) =>
      sendError(res, HttpCode.NOT_FOUND, e)
    );
  },

  readResponses: function (req: Request, res: Response) {
    const pk = req.params.formId;
    // TODO: Search and find form responses
    //dbManager.genericSearch(Model.SDCFormResponse, );
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
