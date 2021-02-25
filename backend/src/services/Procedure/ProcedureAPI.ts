import { Router } from "express";
import { ProcedureController } from "./ProcedureController";

export class ProcedureAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getProcedure();
    this.postProcedure();
    return this.router;
  }

  private getProcedure() {
    this.router.get("/procedures/:procedureId", ProcedureController.read);
  }

  private postProcedure() {
    this.router.post("/procedures", ProcedureController.create);
  }
}
