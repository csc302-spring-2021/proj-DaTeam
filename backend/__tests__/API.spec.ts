const app = require("../build/App").default;
const HttpCode = require("../build/utils/Error").HttpCode;
const http = require("http");
const supertest = require("supertest");
const customMatchers = require("./ValidateResponse").default;

import * as Mock from "./MockData";
import { databaseManager } from "../build/db";
import { Model, Mocks } from "@dateam/shared";

let server, request;

/* Set up */
beforeAll(() => {
  expect.extend(customMatchers);
  // Add Mock endpoint example
  app.get("/mock", function (req, res) {
    let data = {
      mock_patient: Mock.getMockPatient(),
      mock_procedure: Mock.getMockProcedure(),
      mock_form: Mock.getMockForm(),
      mock_form_response: Mock.getMockFormResponse(),
    };
    res.status(HttpCode.OK).json(data);
  });

  server = http.createServer(app);
  request = supertest(server);
});

// Mock Endpoint test example
describe("GET /mock", () => {
  test("Mock Example", (done) => {
    request
      .get("/mock")
      .expect("Content-Type", /json/)
      .expect(HttpCode.OK)
      .then((response) => {
        expect(response.body.mock_patient).isPatient();
        expect(response.body.mock_procedure).isProcedure();
        expect(response.body.mock_form).isForm();
        expect(response.body.mock_form_response).isFormResponse();
        done();
      })
      .catch((err) => done(err));
  });
});

/*
 * Demo API tests
 * Add a new test block for each API end point
 */

describe("/api/v1/patients", () => {
  var mockPatient = Mock.getMockPatient();
  var patientId = mockPatient.id;
  var patientName = mockPatient.name;

  test("GET: Get all patients", (done) => {
    done();
  });

  test("POST: Create a new patient", (done) => {
    done();
  });

  test("POST and GET: Create a new patient and verify persistence", (done) => {
    done();
  });
});

describe("/api/v1/patients/{patiendId}", () => {
  test("GET: Get a specified patient", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong parameter
    done();
  });
  test("GET: Not Found", (done) => {
    // id doesnt exist
    done();
  });
});

describe("/api/v1/procedures/{procedureId}", () => {
  test("GET: Get a specific procedure", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong parameter
    done();
  });
  test("GET: Not Found", (done) => {
    // id doesnt exist
    done();
  });
});

describe("/api/v1/parser", () => {
  test("GET: Parses an SDC XML file into JSON", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong parameter or bad file
    done();
  });
});

describe("/api/v1/forms", () => {
  test("GET: Get all forms", (done) => {
    done();
  });
  test("POST: Create new form", (done) => {
    done();
  });
  test("POST and GET: Create new form and verify persistence", (done) => {
    done();
  });
  test("POST: Bad Request", (done) => {
    // wrong parameter?
    done();
  });
});

describe("/api/v1/forms/{formId}", () => {
  let formId;
  beforeAll(() => {
    var mockForm = Mocks.buildFormComplete();
    return databaseManager
      .genericCreate(mockForm, Model.SDCForm)
      .then((id) => (formId = id));
  });
  test("Get: Get a specific form", (done) => {
    done();
  });
  test("Get: Bad Request", (done) => {
    // wrong parameter
    done();
  });
  test("Get: Not Found", (done) => {
    // id doesnt exist
    done();
  });
});

describe("/api/v1/forms/{formId}/responses", () => {
  test("GET: Get all responses for a form", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong param
    done();
  });
  test("GET: Not Found", (done) => {
    // id doesnt exist
    done();
  });
});

describe("/api/v1/responses", () => {
  test("POST: Create a new form resposne", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong param
    done();
  });
  test("GET: Not Found", (done) => {
    // id doesnt exist
    done();
  });
});

describe("/api/v1/responses/{responseId}", () => {
  test("GET: Get a specific form response", (done) => {
    done();
  });
  test("GET: Bad Request", (done) => {
    // wrong param
    done();
  });
  test("GET: Not Found", (done) => {
    // ID doesnt exists
    done();
  });
  test("PUT: Update a specific form response", (done) => {
    done();
  });
  test("PUT: Bad Request", (done) => {
    // wrong param
    done();
  });
  test("PUT: Not Found", (done) => {
    // ID doesnt exists
    done();
  });
});
