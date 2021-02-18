const app = require("../build/App").default;
const HttpCode = require("../build/utils/Error").HttpCode;
const http = require("http");
const supertest = require('supertest');


// Add Mock endpoint example
app.get("/mock", function(req, res) {
    res.status(200).json({ name: 'dateam' });
  });

const server = http.createServer(app);
const request = supertest(server);


// Mock Endpoint test example
describe("GET /mock", () => {
    test("Base Case", done => {
        request
            .get("/mock")
            .expect('Content-Type', /json/)
            .expect(HttpCode.OK)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});


/*
 * Demo API tests 
 * Add a new test block for each API end point
 */

describe("GET /api/patient/search: Search for a patient by ID or legal name", () => {
    // For each test case for the endpoint
    test("Return patients matching query", done => {
        // request
        //     .get("/api/patient/search")
        //     .expect(HttpCode.NOT_FOUND)
        //     .end(function(err, res) {
        //         if (err) return done(err);
        //         return done();
        //     });
        done(); // Replace when API is implemented/Stubs on this branch
    });
});

describe("GET /patient/{patientId}: Get a specific patient", () => {
    test("Return the specified patient", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});

describe("GET /procedure/{procedureId}: Get a specific procedure", () => {
    test("Returns the requested procedure", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});

describe("POST /form: Create a new form from an XML document", () => {
    test("Successfully created form", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
});

describe("GET /form/{formId}: Get a specific form", () => {
    test("Return patients matching query", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});

describe("POST /response: Create a new response", () => {
    test("Response created successfully", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});

describe("GET /response/{responseId}: Get a specific form response", () => {
    test("Returns the requested response", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});

describe("PUT /response/{responseId}: Update a response", () => {
    test("Response created successfully", done => {
        done();
    });
    test("Bad Request", done => {
        done();
    });
    test("Not Found", done => {
        done();
    });
});