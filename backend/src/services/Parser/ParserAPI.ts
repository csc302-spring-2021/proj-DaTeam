import express, { Router } from "express";
import { ParseController } from "./ParserController";

export class ParserAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.parseForm();
    return this.router;
  }

  private parseForm() {
    // note: may need to switch back to another middleware to receive other types of data
    this.router.post(
      "/parser",
      express.raw({
        type: "application/xml",
        limit: "50mb",
      }),
      ParseController.parse
    );
  }
}
