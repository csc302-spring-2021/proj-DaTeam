/* 
  Reference for all HTTP codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status  
*/

import e from "express";
import { Request, Response } from "express";
import { GenericJsonSerializer } from "@dateam/shared";

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}

export function sendError(res: any, code: number, error: Error) {
  res.status(code).send({ message: error.message });
}
