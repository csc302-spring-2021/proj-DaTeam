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

  /* GET /patients/{patientId} */
  private getPatient() {
    this.router.get("/patients/:patientId", PatientController.read);
    this.router.get("/patients/search", PatientController.search);
  }

  /* POST /patients/{patientId} */
  private postPatient() {
    //this.router.post("/patient", Patient.create);
  }
}
