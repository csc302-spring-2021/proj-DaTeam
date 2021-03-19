import { Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import * as Utils from "../ControllerUtils";

export const ProcedureController = {
  create: function (req: Request, res: Response) {
    Utils.create(req, res, Model.Procedure).catch((e) =>
      sendError(res, HttpCode.BAD_REQUEST, e)
    );
  },

  read: function (req: Request, res: Response) {
    Utils.read(req, res, Model.Procedure, "procedureId").catch((e) =>
      sendError(res, HttpCode.NOT_FOUND, e)
    );
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
