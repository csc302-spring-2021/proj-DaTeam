import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const PatientController = {
  create: function (req: Request, res: Response) {
    res.sendStatus(501);
  },

  read: function (req: Request, res: Response) {
    res.sendStatus(501);
  },

  search: function (req: Request, res: Response) {
    res.sendStatus(501);
  },

  update: function (req: Request, res: Response) {
    res.sendStatus(501);
  },
  
  destroy: function (req: Request, res: Response) {
    res.sendStatus(501);
  },
};
