import {
  Model,
  FormResponseValidator,
  GenericJsonSerializer,
} from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import * as Utils from "../ControllerUtils";
import { databaseManager as dbManager } from "../../db";

export const ResponseController = {
  create: function (req: Request, res: Response) {
    let formResponse: Model.SDCFormResponse;
    try {
      formResponse = GenericJsonSerializer.decode(
        req.body,
        Model.SDCFormResponse
      );
    } catch (e) {
      sendError(res, HttpCode.BAD_REQUEST, e);
      return;
    }
    dbManager
      .genericRead(formResponse.formId, Model.SDCForm)
      .then((form: Model.SDCForm) => {
        const validation = FormResponseValidator.validate(formResponse, form);
        if (validation.length == 0) {
          Utils.create(req, res, Model.SDCFormResponse);
        } else {
          throw new Error(validation.map((elem) => elem.message).join("\n"));
        }
      })
      .catch((e) => {
        sendError(res, HttpCode.BAD_REQUEST, e);
      });
  },

  read: function (req: Request, res: Response) {
    Utils.read(req, res, Model.SDCFormResponse, "responseId").catch((e) =>
      sendError(res, HttpCode.NOT_FOUND, e)
    );
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  search: function (req: Request, res: Response) {
    Utils.query(req, res, Model.SDCFormResponse, true).catch((e) => {
      sendError(res, HttpCode.BAD_REQUEST, e);
    });
  },
};
