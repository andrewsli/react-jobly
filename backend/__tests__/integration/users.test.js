// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/user");

const {
  TEST_DATA,
  afterEachHook,
  afterAllHook,
  beforeAllHook,
  beforeEachHook
} = require("./config");


beforeAll(async function () {
  await beforeAllHook();
});


beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});


afterEach(async function () {
  await afterEachHook();
});


afterAll(async function () {
  await afterAllHook();
});


describe("POST /users", async function () {
  test("Creates a new user", async function () {
    let dataObj = {
      username: "whiskey",
      first_name: "Whiskey",
      password: "foo123",
      last_name: "Lane",
      email: "whiskey@rithmschool.com",
    };
    const response = await request(app)
        .post("/users")
        .send(dataObj);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
    const whiskeyInDb = await User.findOne("whiskey");
    ["username", "first_name", "last_name"].forEach(key => {
      expect(dataObj[key]).toEqual(whiskeyInDb[key]);
    });
  });

  test("Prevents creating a user with duplicate username", async function () {
    const response = await request(app)
        .post("/users")
        .send({
          username: "test",
          first_name: "Test",
          password: "foo123",
          last_name: "McTester",
          email: "test@rithmschool.com",
        });
    expect(response.statusCode).toBe(409);
  });

  test("Prevents creating a user without required password field", async function () {
    const response = await request(app)
        .post("/users")
        .send({
          username: "test",
          first_name: "Test",
          last_name: "McTester",
          email: "test@rithmschool.com"
        });
    expect(response.statusCode).toBe(400);
  });
});


describe("GET /users", async function () {
  test("Gets a list of 1 user", async function () {
    const response = await request(app)
        .get("/users")
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.body.users).toHaveLength(1);
    expect(response.body.users[0]).toHaveProperty("username");
    expect(response.body.users[0]).not.toHaveProperty("password");
  });
});


describe("GET /users/:username", async function () {
  test("Gets a single a user", async function () {
    const response = await request(app)
        .get(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("test");
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    const response = await request(app)
        .get(`/users/yaaasss`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(404);
  });
});


describe("PATCH /users/:username", async () => {
  test("Updates a single a user's first_name with a selective update", async function () {
    const response = await request(app)
        .patch(`/users/${TEST_DATA.currentUsername}`)
        .send({first_name: "xkcd", _token: `${TEST_DATA.userToken}`});
    const user = response.body.user;
    expect(user).toHaveProperty("username");
    expect(user).not.toHaveProperty("password");
    expect(user.first_name).toBe("xkcd");
    expect(user.username).not.toBe(null);
  });

  test("Updates a single a user's password", async function () {
    const response = await request(app)
        .patch(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`, password: "foo12345"});

    const user = response.body.user;
    expect(user).toHaveProperty("username");
    expect(user).not.toHaveProperty("password");
  });

  test("Prevents a bad user update", async function () {
    const response = await request(app)
        .patch(`/users/${TEST_DATA.currentUsername}`)
        .send({cactus: false, _token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(400);
  });

  test("Forbids a user from editing another user", async function () {
    const response = await request(app)
        .patch(`/users/notme`)
        .send({password: "foo12345", _token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(401);
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    // delete user first
    await request(app)
        .delete(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    const response = await request(app)
        .patch(`/users/${TEST_DATA.currentUsername}`)
        .send({password: "foo12345", _token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(404);
  });
});


describe("DELETE /users/:username", async function () {
  test("Deletes a single a user", async function () {
    const response = await request(app)
        .delete(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.body).toEqual({message: "User deleted"});
  });

  test("Forbids a user from deleting another user", async function () {
    const response = await request(app)
        .delete(`/users/notme`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(401);
  });

  test("Responds with a 404 if it cannot find the user in question", async function () {
    // delete user first
    await request(app)
        .delete(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    const response = await request(app)
        .delete(`/users/${TEST_DATA.currentUsername}`)
        .send({_token: `${TEST_DATA.userToken}`});
    expect(response.statusCode).toBe(404);
  });
});
