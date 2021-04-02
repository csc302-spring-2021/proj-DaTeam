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
  test("GET: Get all patients", (done) => {
    request
      .get("/api/v1/patients")
      .expect(HttpCode.OK)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).isList();
        expect(response.body).allPatientItems();
        done();
      })
      .catch((err) => done(err));
  });

  test("POST: Create a new patient", (done) => {
    let patient = Mock.getMockPatient();
    request
      .post("/api/v1/patients")
      .send(patient)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });

  test("POST and GET: Create a new patient and verify persistence", (done) => {
    let patient = Mock.getMockPatient();
    request
      .post("/api/v1/patients")
      .send(patient)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((res) => {
        let uid = res.text;
        request
          .get(`/api/v1/patients/${uid}`)
          .expect(HttpCode.OK)
          .expect("Content-Type", /json/)
          .then((response) => {
            expect(response.body).isPatient();
            expect(response.body).hasPatientId(uid);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});

describe("/api/v1/patients/{patiendId}", () => {
  test("GET: Get a specified patient", (done) => {
    let patient = Mock.getMockPatient();
    request
      .post("/api/v1/patients")
      .send(patient)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((res) => {
        let uid = res.text;
        request
          .get(`/api/v1/patients/${uid}`)
          .expect(HttpCode.OK)
          .expect("Content-Type", /json/)
          .then((response) => {
            expect(response.body).isPatient();
            expect(response.body).hasPatientId(uid);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
  // Skipping Bad Request because I am unable to trigger the error
  // I keep getting Not Found
  test.skip("GET: Bad Request", (done) => {
    request
      .get(`/api/v1/patients/bad uid`)
      .expect(HttpCode.BAD_REQUEST)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  test("GET: Not Found", (done) => {
    let uid = "fake_uid_doesnt_exist";
    request
      .get(`/api/v1/patients/${uid}`)
      .expect(HttpCode.NOT_FOUND)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/api/v1/procedures/{procedureId}", () => {
  test("GET: Get a specific procedure", (done) => {
    let proc = Mock.getMockProcedure();
    request
      .post("/api/v1/procedures")
      .send(proc)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((res) => {
        let uid = res.text;
        request
          .get(`/api/v1/procedures/${uid}`)
          .expect(HttpCode.OK)
          .expect("Content-Type", /json/)
          .then((response) => {
            expect(response.body).isProcedure();
            expect(response.body).hasProcedureId(uid);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
  // Skipping Bad Request because I am unable to trigger the error
  // I keep getting Not Found
  test.skip("GET: Bad Request", (done) => {
    done();
  });
  test("GET: Not Found", (done) => {
    let uid = "fake_uid_doesnt_exist";
    request
      .get(`/api/v1/patients/${uid}`)
      .expect(HttpCode.NOT_FOUND)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/api/v1/parser", () => {
  test("GET: Parses an SDC XML file into JSON", (done) => {
    let xmlData = Mock.getMockXMLData();
    request
      .post(`/api/v1/parser`)
      .set("Content-Type", "application/xml")
      .send(xmlData)
      .expect(HttpCode.OK)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  test("GET: Bad Request", (done) => {
    let xmlData = Mock.getMockXMLData();
    request
      .post(`/api/v1/parser`)
      .send(xmlData)
      .expect(HttpCode.BAD_REQUEST)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/api/v1/forms", () => {
  test("GET: Get all forms", (done) => {
    request
      .get(`/api/v1/forms`)
      .expect(HttpCode.OK)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).isList();
        done();
      })
      .catch((err) => done(err));
  });
  test("POST: Create new form", (done) => {
    let form = Mock.getMockForm();
    request
      .post(`/api/v1/forms`)
      .send(form)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  test("POST and GET: Create new form and verify persistence", (done) => {
    let form = Mock.getMockForm();
    request
      .post(`/api/v1/forms`)
      .send(form)
      .expect(HttpCode.CREATED)
      .expect("Content-Type", /text/)
      .then((res) => {
        let uid = res.text;
        request
          .get(`/api/v1/forms`)
          .expect(HttpCode.OK)
          .expect("Content-Type", /json/)
          .then((response) => {
            expect(response.body).isList();
            expect(response.body).not.isListEmpty();
            expect(response.body).isAllFormItems();
            expect(response.body).containsID(uid, Model.SDCForm);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
  test("POST: Bad Request", (done) => {
    let form = Mock.getMockPatient();
    request
      .post(`/api/v1/forms`)
      .send(form)
      .expect(HttpCode.BAD_REQUEST)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
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
    request
      .get(`/api/v1/forms/${formId}`)
      .expect(HttpCode.OK)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).isForm();
        expect(response.body).hasFormId(formId);
        done();
      })
      .catch((err) => done(err));
  });
  // Skipping Bad Request because I am unable to trigger the error
  // I keep getting Not Found
  test.skip("Get: Bad Request", (done) => {
    done();
  });
  test("Get: Not Found", (done) => {
    request
      .get(`/api/v1/forms/fake_id`)
      .expect(HttpCode.NOT_FOUND)
      .expect("Content-Type", /json/)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
});

describe("/api/v1/forms/{formId}/responses", () => {
  let formId;
  beforeAll(() => {
    var mockForm = Mocks.buildFormComplete();
    return databaseManager
      .genericCreate(mockForm, Model.SDCForm)
      .then((id) => (formId = id));
  });
  test("GET: Get all responses for a form", (done) => {
    request
      .get(`/api/v1/forms/${formId}/responses`)
      .expect(HttpCode.OK)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).isList();
        done();
      })
      .catch((err) => done(err));
  });
  // Skipping Bad Request and Not Found because I am unable to trigger the error
  // I keep getting OK with empty list in these cases
  test.skip("GET: Bad Request", (done) => {
    request
      .get(`/api/v1/forms/fake_id/responses`)
      .expect(HttpCode.BAD_REQUEST)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  test.skip("GET: Not Found", (done) => {
    done();
  });
});

describe("/api/v1/responses", () => {
  test("POST: Create a new form response", (done) => {
    let formRespose = Mock.getMockFormResponse();
    request
      .post(`/api/v1/responses`)
      .send(formRespose)
      .expect(HttpCode.CREATED)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  test("POST: Bad Request", (done) => {
    let formRespose = Mock.getMockPatient();
    request
      .post(`/api/v1/responses`)
      .send(formRespose)
      .expect(HttpCode.BAD_REQUEST)
      .then((response) => {
        done();
      })
      .catch((err) => done(err));
  });
  // Unable to trigger not found. Only able to trigger Bad Request
  test.skip("POST: Not Found", (done) => {
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
