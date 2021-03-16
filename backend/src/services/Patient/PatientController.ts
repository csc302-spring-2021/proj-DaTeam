import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const PatientController = {
  create: function (req: Request, res: Response) {
    try {
      const objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.Patient
      );
      dbManager
        .genericCreate(objectToCreate, Model.Patient)
        .then((pk) => {
          res.status(HttpCode.CREATED).send(pk);
        })
        .catch((e) => {
          res.status(HttpCode.BAD_REQUEST).send(e.name + ": " + e.message);
        });
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send("Invalid object");
      return;
    }
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
        res.status(HttpCode.NOT_FOUND).send(e.name + ": " + e.message);
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
