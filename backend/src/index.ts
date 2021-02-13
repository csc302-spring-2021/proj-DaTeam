import express from "express";
import * as config from "./config.json";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World 5");
});

app.listen(config.app.port, () => {
  return console.log(`server is listening on ${config.app.port}`);
});
