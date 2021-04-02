import { GenericJsonSerializer, Query } from "@dateam/shared";
import { Request, Response } from "express";
import { HttpCode } from "../utils/Error";
import { databaseManager as dbManager } from "../db";

export async function create(
  req: Request,
  res: Response,
  targetClass: new () => any
) {
  const obj = GenericJsonSerializer.decode(req.body, targetClass);
  const pk = await dbManager.genericCreate(obj, targetClass);
  res.type("txt");
  res.status(HttpCode.CREATED).send(pk);
}

export async function read(
  req: Request,
  res: Response,
  targetClass: new () => any,
  pkKey: string
) {
  const pk = req.params[pkKey];
  const result = await dbManager.genericRead(pk, targetClass);
  const encoded = GenericJsonSerializer.encode(result, targetClass);
  res.type("json");
  res.status(HttpCode.OK).send(encoded);
}

export async function search(
  req: Request,
  res: Response,
  targetClass: new () => any,
  param: Query.Query | null,
  partial: boolean
) {
  const results = await dbManager.genericSearch(targetClass, param, partial);
  const encoded = results.map((o) =>
    GenericJsonSerializer.encode(o, targetClass)
  );
  res.type("json");
  res.status(HttpCode.OK).send(encoded);
}

export async function query(
  req: Request,
  res: Response,
  targetClass: new () => any,
  partial: boolean
) {
  const param: Query.Query = GenericJsonSerializer.decode(
    req.body,
    Query.Query
  );
  if (param.targetClass !== targetClass.name)
    throw new Error("Query class incorrect");
  await search(req, res, targetClass, param, partial);
}
