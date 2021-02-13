import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const SDCFormController = {
  create: function (req: Request, res: Response) {
    res.status(HttpCode.OK);
  },

  read: function (req: Request, res: Response) {
    res.status(HttpCode.OK);
  },

  update: function (req: Request, res: Response) {
    res.status(HttpCode.OK);
  },
  
  destroy: function (req: Request, res: Response) {
    res.status(HttpCode.OK);
  },
};
