import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db";

export const PatientController = {
  create: function (req: Request, res: Response) {
    let objectToCreate;
    try {
      objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.Patient
      );
    } catch (e) {
      sendError(res, HttpCode.BAD_REQUEST, e);
    }

    dbManager
      .genericCreate(objectToCreate, Model.Patient)
      .then((pk) => {
        res.status(HttpCode.CREATED).send(pk);
      })
      .catch((e) => {
        sendError(res, HttpCode.BAD_REQUEST, e);
      });
  },

  read: function (req: Request, res: Response) {
    const pk = req.params.patientId;
    dbManager
      .genericRead(pk, Model.Patient)
      .then((sdcPatient) => {
        const serialized = GenericJsonSerializer.encode(
          sdcPatient,
          Model.Patient
        );
        res.status(HttpCode.OK).send(serialized);
      })
      .catch((e) => {
        sendError(res, HttpCode.NOT_FOUND, e);
      });
  },

  search: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
