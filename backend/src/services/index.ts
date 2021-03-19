import { Router } from "express";
import { FormAPI } from "./Form";
import { ParserAPI } from "./Parser";
import { PatientAPI } from "./Patient";
import { ProcedureAPI } from "./Procedure";
import { ResponseAPI } from "./Response";

export class ServicesAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public getRouter() {
    this.routeSDCFormAPI();
    this.routeSDCPaserAPI();
    this.routeSDCPatientAPI();
    this.routeSDCProcedureAPI();
    this.routeSDCResponseAPI();
    return this.router;
  }

  private routeSDCFormAPI() {
    const scheduleEventAPI = new FormAPI(this.router);
    const scheduleEventRouter = scheduleEventAPI.returnRouter();
    this.router.use("/v1", scheduleEventRouter);
  }

  private routeSDCPaserAPI() {
    const parserAPI = new ParserAPI(this.router);
    const parserRouter = parserAPI.returnRouter();
    this.router.use("/v1", parserRouter);
  }

  private routeSDCPatientAPI() {
    const patientAPI = new PatientAPI(this.router);
    const patientRouter = patientAPI.returnRouter();
    this.router.use("/v1", patientRouter);
  }

  private routeSDCProcedureAPI() {
    const procedureAPI = new ProcedureAPI(this.router);
    const procedureRouter = procedureAPI.returnRouter();
    this.router.use("/v1", procedureRouter);
  }

  private routeSDCResponseAPI() {
    const responseAPI = new ResponseAPI(this.router);
    const responseRouter = responseAPI.returnRouter();
    this.router.use("/v1", responseRouter);
  }
}
