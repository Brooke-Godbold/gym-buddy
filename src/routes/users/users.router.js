import express from "express";
import { httpGetUserByGoogleId } from "./users.controller.js";
import { authCheck } from "../../middleware/authHandler.js";

const usersRouter = express.Router();

usersRouter.get("/", authCheck, httpGetUserByGoogleId);

export { usersRouter };
