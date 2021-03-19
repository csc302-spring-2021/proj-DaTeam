import { Router } from "express";
import { FormController } from "./FormController";

export class FormAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getForm();
    this.getAllFormResponses();
    this.getAllForms();
    this.postForm();
    this.parseForm();
    return this.router;
  }

  private getForm() {
    this.router.get("/forms/:formId", FormController.read);
  }

  private getAllFormResponses() {
    this.router.get("/forms/:formId/responses", FormController.readResponses);
  }

  private getAllForms() {
    this.router.get("/forms", FormController.readAll);
  }

  private postForm() {
    this.router.post("/forms", FormController.create);
  }

  private parseForm() {
    this.router.post("/forms/parse", FormController.parse);
  }
}
