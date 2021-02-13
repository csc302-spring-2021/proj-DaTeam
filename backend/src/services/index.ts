import { Router } from "express";
import { SDCFormDAL, SDCFormAPI } from "./SDCForm";


export interface IExtensionsDB {
  sdcForm: SDCFormDAL;
}

export class ServicesAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public getRouter() {
    this.routeSDCFormAPI();
    return this.router;
  }

  private routeSDCFormAPI() {
    const scheduleEventAPI = new SDCFormAPI(this.router);
    const scheduleEventRouter = scheduleEventAPI.returnRouter();
    this.router.use("/v1", scheduleEventRouter);
  }


}

export { SDCFormDAL };
