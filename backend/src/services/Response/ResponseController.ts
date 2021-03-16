import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const ResponseController = {
  create: function (req: Request, res: Response) {
    try {
      const objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.SDCFormResponse
      );
      dbManager
        .genericCreate(objectToCreate, Model.SDCFormResponse)
        .then((pk) => {
          res.status(HttpCode.OK).send(pk);
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
    const pk = req.params.responseId;
    dbManager
      .genericRead(pk, Model.SDCFormResponse)
      .then((sdcForm) => {
        const serialized = GenericJsonSerializer.encode(
          sdcForm,
          Model.SDCFormResponse
        );
        res.status(HttpCode.OK).send(serialized);
      })
      .catch((e) => {
        res.status(HttpCode.NOT_FOUND).send(e.name + ": " + e.message);
      });
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
