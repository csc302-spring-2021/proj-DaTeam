import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const ResponseController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(HttpCode.NOT_IMPLEMENTED);
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
