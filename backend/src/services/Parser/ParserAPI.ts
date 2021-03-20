import { Router } from "express";
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
    this.router.post("/parser", ParseController.parse);
  }
}
