import express from "express";
import {
  getIsAuthenticated,
  googleOauthLogin,
  handleGoogleOauthCallback,
  handleOauthRedirect,
  logout,
  storeReturnPath,
} from "./auth.controller.js";

const authRouter = express.Router();

authRouter.get("/google", storeReturnPath, googleOauthLogin);

authRouter.get(
  "/google/callback",
  handleGoogleOauthCallback,
  handleOauthRedirect
);

authRouter.post("/logout", logout);

authRouter.get("/", getIsAuthenticated);

export { authRouter };
