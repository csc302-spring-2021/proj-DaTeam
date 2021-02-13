import { Router } from "express";
import { SDCFormController } from "./SDCFormController";

export class SDCFormAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getForm();
    return this.router;
  }

  /* GET /form/{formId} */
  private getForm() {
    this.router.get("/form/:formId", SDCFormController.read);
  }
}
