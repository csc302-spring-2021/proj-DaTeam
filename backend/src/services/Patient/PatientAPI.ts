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
    return this.router;
  }

  /* GET /patient/{patientId} */
  private getPatient() {
    this.router.get("/patient/:patientId", PatientController.read);
    this.router.get("/patient/search", PatientController.search);
  }

  /* POST /patient/{patientId} */
  private postPatient() {
    //this.router.post("/patient", Patient.create);
  }
}
