import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode, sendError } from "../../utils/Error";
import { databaseManager as dbManager } from "../../db/DatabaseManager";

export const ResponseController = {
  create: function (req: Request, res: Response) {
    let objectToCreate;
    try {
      objectToCreate = GenericJsonSerializer.decode(
        req.body.properties,
        Model.SDCFormResponse
      );
    } catch (e) {
      sendError(res, HttpCode.BAD_REQUEST, e);
    }
    dbManager
      .genericCreate(objectToCreate, Model.SDCFormResponse)
      .then((pk) => {
        res.status(HttpCode.NO_CONTENT).send();
      })
      .catch((e) => {
        sendError(res, HttpCode.BAD_REQUEST, e);
      });
  },

  read: function (req: Request, res: Response) {
    const pk = req.params.responseId;
    dbManager
      .genericRead(pk, Model.SDCFormResponse)
      .then((sdcFormResponse) => {
        const serialized = GenericJsonSerializer.encode(
          sdcFormResponse,
          Model.SDCFormResponse
        );
        res.status(HttpCode.OK).send(serialized);
      })
      .catch((e) => {
        sendError(res, HttpCode.BAD_REQUEST, e);
      });
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },

  destroy: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
  },
};
