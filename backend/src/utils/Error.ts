/* 
  Reference for all HTTP codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status  
*/

import { Response } from "express";

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

export function sendError(res: Response, code: number, error: Error) {
  console.log(error);
  res.type("json");
  res.status(code).send({ message: error.message });
}
