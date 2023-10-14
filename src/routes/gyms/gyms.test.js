import request from "supertest";
import { app } from "../../app";
import {
  connectMongoTestServer,
  disconnectMongoTestServer,
} from "../../mongo/mongotest";
import { postGym } from "../../utils/testLoader";

describe("Test Gyms API", () => {
  beforeAll(async () => {
    await connectMongoTestServer();
  });

  afterAll(async () => {
    await disconnectMongoTestServer();
  });

  describe("Test GET /gyms", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/gyms")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /gyms", () => {
    const gymData = postGym();

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/gyms")
        .send(gymData)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.name).toBe(gymData.name);
    });
  });
});
