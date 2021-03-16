import express, { Router } from "express";
import { FormController } from "./FormController";

export class FormAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getForm();
    this.postForm();
    this.parseForm();
    return this.router;
  }

  /* GET /forms/{formId} */
  private getForm() {
    this.router.get("/forms/:formId", FormController.read);
  }

  /* POST /forms/{formId} */
  private postForm() {
    this.router.post("/forms", FormController.create);
  }

  private parseForm() {
    // lets endpoints take raw XML files
    // may have to switch back to express.json() for everything else
    this.router.use(
      express.raw({
        type: "application/xml",
      })
    );
    this.router.post("/forms/parse", FormController.parse);
  }
}
