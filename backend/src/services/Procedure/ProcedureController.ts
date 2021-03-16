import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const ProcedureController = {
  create: function (req: Request, res: Response) {
    try {
      const objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.Procedure
      );
      dbManager
        .genericCreate(objectToCreate, Model.Procedure)
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
    const pk = req.params.procedureId;
    dbManager
      .genericRead(pk, Model.Procedure)
      .then((sdcForm) => {
        const serialized = GenericJsonSerializer.encode(
          sdcForm,
          Model.Procedure
        );
        res.status(HttpCode.OK).send(serialized);
      })
      .catch((e) => {
        const serialized = GenericJsonSerializer.encode(e, Error);
        res.status(HttpCode.NOT_FOUND).send(serialized);
      });
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
