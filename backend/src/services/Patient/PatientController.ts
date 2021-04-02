import { Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import * as Utils from "../ControllerUtils";

export const PatientController = {
  create: function (req: Request, res: Response) {
    Utils.create(req, res, Model.Patient).catch((e) =>
      sendError(res, HttpCode.BAD_REQUEST, e)
    );
  },

  read: function (req: Request, res: Response) {
    Utils.read(req, res, Model.Patient, "patientId").catch((e) =>
      sendError(res, HttpCode.NOT_FOUND, e)
    );
  },

  search: function (req: Request, res: Response) {
    Utils.query(req, res, Model.Patient, true).catch((e) => {
      sendError(res, HttpCode.BAD_REQUEST, e);
    });
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  readAll: function (req: Request, res: Response) {
    Utils.search(req, res, Model.Patient, null, true).catch((e) =>
      sendError(res, HttpCode.BAD_REQUEST, e)
    );
  },
};
