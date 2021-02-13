import express, { Request, Response, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/Logger";
import { ErrorCode } from "./utils/Error";
import * as config from "./config.json";

const app = express();
dotenv.config(); // read env variables from .env file

/* Middlewares */
// block cross origin access
app.use(cors());
// convert all incoming requests to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// show which routes are called in console
// only during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// print all api errors
app.use((err: Error, _: Request, res: Response) => {
  logger.error(err.message, err);
  return res.status(ErrorCode.BAD_REQUEST).json({
    error: err.message,
  });
});

// TODO init database


app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World 5");
});

export default app;
