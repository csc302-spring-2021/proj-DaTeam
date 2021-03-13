import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";
import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const ResponseController = {
  create: function (req: Request, res: Response) {
    try {
      const objectToCreate = GenericJsonSerializer.decode(req.body.properties, Model.SDCFormResponse);
      dbManager.genericCreate(objectToCreate, Model.SDCFormResponse).then((pk) => {
        res.status(HttpCode.OK).send(pk);
      })
    } catch(e) {
      res.status(HttpCode.BAD_REQUEST).send("Invalid object");
      return;
    }
  },

  read: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
  
  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
