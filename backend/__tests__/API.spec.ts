const app = require("../build/App").default;
const HttpCode = require("../build/utils/Error").HttpCode;
const http = require("http");
const supertest = require('supertest');
const customMatchers = require('./ValidateResponse').default;

import * as Mock from "./MockData";


let server, request;

/* Set up */
beforeAll(() => {
    expect.extend(customMatchers);
    // Add Mock endpoint example
    app.get("/mock", function(req, res) {
        let data = {
            mock_patient: Mock.getMockPatient(),
            mock_procedure: Mock.getMockProcedure(),
            mock_form: Mock.getMockForm(),
            mock_form_response: Mock.getMockFormResponse()
        }
        res.status(HttpCode.OK).json(data);
    });

    server = http.createServer(app);
    request = supertest(server);
});


// Mock Endpoint test example
describe("GET /mock", () => {
    test("Mock Example", done => {
        request
            .get("/mock")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body.mock_patient).isPatient();
                expect(response.body.mock_procedure).isProcedure();
                expect(response.body.mock_form).isForm();
                expect(response.body.mock_form_response).isFormResponse();
                done();
            })
            .catch(err => done(err));
    });
});

/*
 * Demo API tests 
 * Add a new test block for each API end point
 */

describe("GET /api/patient/search: Search for a patient by ID or legal name", () => {
    var mockPatient = Mock.getMockPatient();
    var patientId = mockPatient.id;
    var patientName = mockPatient.name;

    //extend jest if the functionalities dont already exist

    test("Search by ID that exists", done => {
        request
            .get("/api/patient/search?query=")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body).isPatient(); // check if list
                // make sure list is not empty
                // check if list contains types of patients (all of them are patients)
                // check if list contains the patientID and patientName
                done();
            })
            .catch(err => done(err));
    });
    test("Search by name that exists", done => {
        request
            .get("/api/patient/search?query=")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body).isPatient();// check if list
                // make sure list is not empty
                // check if list contains types of patients (all of them are patients)
                // check if list contains the patientID and patientName
                done();
            })
            .catch(err => done(err));
    });
    test("Search by name that does not exist", done => {
        request
            .get("/api/patient/search?query=")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body).isPatient(); // check if list
                // make sure list is empty
                done();
            })
            .catch(err => done(err));
    });
    test("Search by ID that does not exist", done => {
        request
            .get("/api/patient/search?query=")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body).isPatient();// check if list
                // make sure list is empty
                done();
            })
            .catch(err => done(err));
    });
    test("Search without parameter", done => {
        request
            .get("/api/patient/search?query=")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body).isPatient();// check if list
                // make sure list is empty
                done();
            })
            .catch(err => done(err));
    });
});

describe("GET /api/patient/{patientId}: Get a specific patient", () => {
    test("Return the specified patient", done => {
        request
            .get("/api/patient/{patientId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .get("/api/patient/{patientId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .get("/api/patient/{patientId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("GET /api/procedure/{procedureId}: Get a specific procedure", () => {
    test("Returns the requested procedure", done => {
        request
            .get("/api/procedure/{procedureId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .get("/api/procedure/{procedureId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .get("/api/procedure/{procedureId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("POST /api/form: Create a new form from an XML document", () => {
    test("Successfully created form", done => {
        request
            .post("/api/form")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .post("/api/form")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("GET /api/form/{formId}: Get a specific form", () => {
    test("Return patients matching query", done => {
        request
            .get("/api/form/{formId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .get("/api/form/{formId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .get("/api/form/{formId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("POST /api/response: Create a new response", () => {
    test("Response created successfully", done => {
        request
            .post("/api/response")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .post("/api/response")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .post("/api/response")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("GET /api/response/{responseId}: Get a specific form response", () => {
    test("Returns the requested response", done => {
        request
            .get("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .get("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .get("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe("PUT /api/response/{responseId}: Update a response", () => {
    test("Response created successfully", done => {
        request
            .put("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Bad Request", done => {
        request
            .put("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
    test("Not Found", done => {
        request
            .put("/api/response/{responseId}")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});