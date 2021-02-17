import { Router } from "express";
import { ResponseController } from "./ResponseController";

export class ResponseAPI {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public returnRouter() {
    this.getResponse();
    this.postResponse();
    this.putResponse();
    return this.router;
  }

  /* GET /response/{responseId} */
  private getResponse() {
    this.router.get("/response/:responseId", ResponseController.read);
  }

  /* POST /response/{responseId} */
  private postResponse() {
    this.router.post("/response", ResponseController.create);
  }

  private putResponse() {
    this.router.put("/response/:responseId", ResponseController.update);
  }
}
