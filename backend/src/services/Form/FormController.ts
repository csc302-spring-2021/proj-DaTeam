import { Model, Query } from "@dateam/shared";
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
    Utils.search(
      req,
      res,
      Model.SDCFormResponse,
      Query.query(Model.SDCFormResponse, Query.equals("formId", pk)),
      true
    ).catch((e) => sendError(res, HttpCode.BAD_REQUEST, e));
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    //res.status(HttpCode.OK).send();
  },

  readAll: function (req: Request, res: Response) {
    Utils.search(req, res, Model.SDCForm, null, true).catch((e) =>
      sendError(res, HttpCode.BAD_REQUEST, e)
    );
  },

  search: function (req: Request, res: Response) {
    Utils.query(req, res, Model.SDCForm, true).catch((e) => {
      sendError(res, HttpCode.BAD_REQUEST, e);
    });
  },
};
