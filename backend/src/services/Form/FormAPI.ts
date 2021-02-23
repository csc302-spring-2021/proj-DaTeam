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
    this.parseForm();
    return this.router;
  }

  /* GET /form/{formId} */
  private getForm() {
    this.router.get("/form/:formId", FormController.read);
  }

  /* POST /form/{formId} */
  private postForm() {
    this.router.post("/form", FormController.create);
  }

  private parseForm() {
    this.router.post("/form/parse", FormController.parse);
  }
}
