import { Router } from "express";
import { PatientController } from "./PatientController";

export class PatientAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getPatient();
    this.postPatient();
    this.getAllPatients();
    return this.router;
  }

  private getPatient() {
    this.router.get("/patients/:patientId", PatientController.read);
  }

  private postPatient() {
    this.router.post("/patients", PatientController.create);
  }

  private getAllPatients() {
    this.router.get("/patients", PatientController.readAll);
  }
}
