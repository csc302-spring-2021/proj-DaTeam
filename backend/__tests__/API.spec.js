const app = require("../build/App").default;
const HttpCode = require("../build/utils/Error").HttpCode;
const http = require("http");
const supertest = require('supertest');
const customMatchers = require('./ObjectSchema').default;

expect.extend(customMatchers);

// Add Mock endpoint example
app.get("/mock", function(req, res) {
    let patient = {
        id: "xxxx",
        external_id: "5584-486-674-YM",
        name: "Jane Doe"
    };
    res.status(HttpCode.OK).json({mock_patient: patient});
});

const server = http.createServer(app);
const request = supertest(server);

// Mock Endpoint test example
describe("GET /mock", () => {
    test("Mock Example", done => {
        request
            .get("/mock")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .then(response => {
                expect(response.body.mock_patient).isPatient();
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
    test("Return patients matching query", done => {
        request
            .get("/api/patient/search")
            .expect(HttpCode.NOT_IMPLEMENTED)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
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