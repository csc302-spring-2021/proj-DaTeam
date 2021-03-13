import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";
import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";

export const PatientController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
    try {
      const objectToCreate = GenericJsonSerializer.decode(req.body.properties, Model.Patient);
      dbManager.genericCreate(objectToCreate, Model.Patient).then((pk) => {
        res.status(HttpCode.OK).send(pk);
      })
    } catch(e) {
      res.status(HttpCode.BAD_REQUEST).send("Invalid object");
      return;
    }
  },

  read: function (req: Request, res: Response) {
    const pk = req.params.patientId;
    dbManager.genericRead(pk, Model.Patient).then((sdcPatient) => {
        const serialized = GenericJsonSerializer.encode(sdcPatient, Model.Patient);
        res.status(HttpCode.OK).send(serialized);
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
