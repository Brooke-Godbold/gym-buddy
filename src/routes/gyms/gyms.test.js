import { jest } from "@jest/globals";

import request from "supertest";

import {
  connectMongoTestServer,
  disconnectMongoTestServer,
} from "../../mongo/mongotest";

import { postGym } from "../../utils/testLoader";

describe("Test Gyms API", () => {
  beforeAll(async () => {
    await connectMongoTestServer();

    jest.unstable_mockModule("../../middleware/authHandler", () => ({
      authCheck: jest.fn((req, res, next) => {
        next();
      }),
    }));
  });

  afterAll(async () => {
    await disconnectMongoTestServer();
  });

  describe("Test GET /gyms", () => {
    test("It should respond with 200 success", async () => {
      const { app } = await import("../../app");

      await request(app)
        .get("/gyms")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /gyms", () => {
    const gymData = postGym();

    test("It should respond with 201 success", async () => {
      const { app } = await import("../../app");

      const response = await request(app)
        .post("/gyms")
        .send(gymData)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.name).toBe(gymData.name);
    });
  });
});
