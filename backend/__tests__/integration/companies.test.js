// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

const {
  TEST_DATA,
  afterEachHook,
  beforeEachHook,
  afterAllHook
} = require("./config");


beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});


describe("POST /companies", async function () {
  test("Creates a new company", async function () {
    const response = await request(app)
        .post("/companies")
        .send({
          handle: "whiskey",
          name: "Whiskey",
          _token: TEST_DATA.userToken
        });
    expect(response.statusCode).toBe(201);
    expect(response.body.company).toHaveProperty("handle");
  });

  test("Prevents creating a company with duplicate handle", async function () {
    const response = await request(app)
        .post("/companies")
        .send({
          _token: TEST_DATA.userToken,
          handle: "rithm",
          name: "Test"
        });
    expect(response.statusCode).toBe(409);
  });
});


describe("GET /companies", async function () {
  test("Gets a list of 1 company", async function () {
    const response = await request(app).get("/companies");
    expect(response.body.companies).toHaveLength(1);
    expect(response.body.companies[0]).toHaveProperty("handle");
  });

  test("Has working search", async function () {
    await request(app)
        .post("/companies")
        .set("authorization", `${TEST_DATA.userToken}`)
        .send({
          _token: TEST_DATA.userToken,
          handle: "hooli",
          name: "Hooli"
        });

    await request(app)
        .post("/companies")
        .set("authorization", `${TEST_DATA.userToken}`)
        .send({
          _token: TEST_DATA.userToken,
          handle: "pp",
          name: "Pied Piper"
        });

    const response = await request(app)
        .get("/companies?search=hooli")
        .send({
          _token: TEST_DATA.userToken
        });
    expect(response.body.companies).toHaveLength(1);
    expect(response.body.companies[0]).toHaveProperty("handle");
  });
});


describe("GET /companies/:handle", async function () {
  test("Gets a single a company", async function () {
    const response = await request(app)
        .get(`/companies/${TEST_DATA.currentCompany.handle}`)
        .send({
          _token: TEST_DATA.userToken
        });
    expect(response.body.company).toHaveProperty("handle");
    expect(response.body.company.handle).toBe("rithm");
  });

  test("Responds with a 404 if it cannot find the company in question", async function () {
    const response = await request(app)
        .get(`/companies/yaaasss`)
        .send({
          _token: TEST_DATA.userToken
        });
    expect(response.statusCode).toBe(404);
  });
});


describe("PATCH /companies/:handle", async function () {
  test("Updates a single a company's name", async function () {
    const response = await request(app)
        .patch(`/companies/${TEST_DATA.currentCompany.handle}`)
        .send({
          name: "xkcd",
          _token: TEST_DATA.userToken
        });
    expect(response.body.company).toHaveProperty("handle");
    expect(response.body.company.name).toBe("xkcd");
    expect(response.body.company.handle).not.toBe(null);
  });

  test("Prevents a bad company update", async function () {
    const response = await request(app)
        .patch(`/companies/${TEST_DATA.currentCompany.handle}`)
        .send({
          _token: TEST_DATA.userToken,
          cactus: false
        });
    expect(response.statusCode).toBe(400);
  });

  test("Responds with a 404 if it cannot find the company in question", async function () {
    // delete company first
    await request(app).delete(`/companies/${TEST_DATA.currentCompany.handle}`);
    const response = await request(app)
        .patch(`/companies/taco`)
        .send({
          name: "newTaco",
          _token: TEST_DATA.userToken
        });
    expect(response.statusCode).toBe(404);
  });
});


describe("DELETE /companies/:handle", async function () {
  test("Deletes a single a company", async function () {
    const response = await request(app)
        .delete(`/companies/${TEST_DATA.currentCompany.handle}`)
        .send({
          _token: TEST_DATA.userToken
        });
    expect(response.body).toEqual({message: "Company deleted"});
  });

  test("Responds with a 404 if it cannot find the company in question", async function () {
    // delete company first
    const response = await request(app)
        .delete(`/companies/notme`)
        .send({
          _token: TEST_DATA.userToken
        });
    expect(response.statusCode).toBe(404);
  });
});


afterEach(async function () {
  await afterEachHook();
});


afterAll(async function () {
  await afterAllHook();
});
