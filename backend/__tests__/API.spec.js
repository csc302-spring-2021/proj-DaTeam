const app = require("../build/App").default;
const http = require("http");
const supertest = require('supertest');

// Add Mock endpoint
app.get("/mock", function(req, res) {
    res.status(200).json({ name: 'dateam' });
  });

const server = http.createServer(app);
const request = supertest(server);


// Mock Endpoint test
describe("GET /mock", () => {
    // For each test case for the endpoint
    test("Base Case", done => {
        request
            .get("/mock")
            .expect('Content-Type', /json/)
            .expect(200)
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

// For each endpoint
describe("GET /api/patient/search", () => {
    // For each test case for the endpoint
    test("Base Case", done => {
        return done();
    });
});