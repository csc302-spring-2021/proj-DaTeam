/* 
  Reference for all HTTP codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status  
*/

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
