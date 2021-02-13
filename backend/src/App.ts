import path from "path";
import express, { Request, Response, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import logger from "./utils/Logger";
import { HttpCode } from "./utils/Error";
import { ServicesAPI } from "./services";

const app = express();
dotenv.config(); // read env variables from .env file

/* Middlewares */
// block cross origin access
app.use(cors());
// convert all incoming requests to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve OpenAPI documentation
const openapiFilePath = path.resolve(__dirname, "../openapi.yml");
const openapiDocument = YAML.load(openapiFilePath);
app.use(
  "/openapi",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// show which routes are called in console
// only during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// print all api errors
app.use((err: Error, _: Request, res: Response) => {
  logger.error(err.message, err);
  return res.status(HttpCode.BAD_REQUEST).json({
    error: err.message,
  });
});

// TODO init database

const router: Router = express.Router();
const serviceAPI = new ServicesAPI(router);

app.get("/api", serviceAPI.getRouter());

export default app;
