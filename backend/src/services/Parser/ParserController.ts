import { Mocks, GenericJsonSerializer, Model } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../../utils/Error";

export const ParseController = {
  parse: function (req: Request, res: Response) {
    const sdcForm = Mocks.buildFormComplete();
    const serialized = GenericJsonSerializer.encode(sdcForm, Model.SDCForm);

    res.status(HttpCode.OK).send(serialized);
  },
};
