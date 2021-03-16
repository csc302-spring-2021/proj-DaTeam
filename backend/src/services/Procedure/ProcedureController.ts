import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const ProcedureController = {
  create: function (req: Request, res: Response) {
    let objectToCreate;
    try {
      const objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.Procedure
      );
    } catch (e) {
      sendError(res, HttpCode.BAD_REQUEST, e);
    }

    dbManager
      .genericCreate(objectToCreate, Model.Procedure)
      .then((pk) => {
        res.status(HttpCode.CREATED).send(pk);
      })
      .catch((e) => {
        sendError(res, HttpCode.BAD_REQUEST, e);
      });
  },

  read: function (req: Request, res: Response) {
    const pk = req.params.procedureId;
    dbManager
      .genericRead(pk, Model.Procedure)
      .then((procedure) => {
        const serialized = GenericJsonSerializer.encode(
          procedure,
          Model.Procedure
        );
        res.status(HttpCode.OK).send(serialized);
      })
      .catch((e) => {
        sendError(res, HttpCode.NOT_FOUND, e);
      });
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
