import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const ProcedureController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(501);
    //res.status(HttpCode.OK).send();
  },

  read: function (req: Request, res: Response) {
    res.sendStatus(501);
    //res.status(HttpCode.OK).send();
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(501);
    //res.status(HttpCode.OK).send();
  },
  
  destroy: function (req: Request, res: Response) {
    res.sendStatus(501);
    //res.status(HttpCode.OK).send();
  },
};