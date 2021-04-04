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
    this.searchResponses();
    return this.router;
  }

  /* GET /responses/{responseId} */
  private getResponse() {
    this.router.get("/responses/:responseId", ResponseController.read);
  }

  /* POST /responses */
  private postResponse() {
    this.router.post("/responses", ResponseController.create);
  }

  /* PUT /responses/{responseId} */
  private putResponse() {
    this.router.put("/responses/:responseId", ResponseController.update);
  }

  private searchResponses() {
    this.router.post("/responses/search", ResponseController.search);
  }
}
