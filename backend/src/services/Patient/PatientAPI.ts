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
    this.searchPatients();
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

  private searchPatients() {
    this.router.post("/patients/search", PatientController.search);
  }
}
