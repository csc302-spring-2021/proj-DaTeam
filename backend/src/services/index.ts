import { Router } from "express";
import { FormDAL, FormAPI } from "./Form";

export interface IExtensionsDB {
  form: FormDAL;
}
export { FormDAL };

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
    const scheduleEventAPI = new FormAPI(this.router);
    const scheduleEventRouter = scheduleEventAPI.returnRouter();
    this.router.use("/v1", scheduleEventRouter);
  }
}
