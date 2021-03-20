import { Router } from "express";
import { FormController } from "./FormController";

export class FormAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getForm();
    this.postForm();
    return this.router;
  }

  /* GET /forms/{formId} */
  private getForm() {
    this.router.get("/forms/:formId", FormController.read);
  }

  private getFormResponses() {
    this.router.get("/forms/:formId/responses", FormController.readResponses);
  }

  /* POST /forms/{formId} */
  private postForm() {
    this.router.post("/forms", FormController.create);
  }
}
