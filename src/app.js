import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import dotenv from "dotenv";

import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";

import { authRouter } from "./routes/auth/auth.router.js";
import { usersRouter } from "./routes/users/users.router.js";
import { gymsRouter } from "./routes/gyms/gyms.router.js";
import { errorRouter } from "./routes/error/error.router.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { createUser, getUserByGoogleId } from "./models/user/users.model.js";

dotenv.config();

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.GYM_BUDDY_CLIENT_ID,
  clientSecret: process.env.GYM_BUDDY_CLIENT_SECRET,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  if (profile) {
    const existingUser = await getUserByGoogleId(profile.id);

    if (!existingUser) await createUser(profile.id);
  }

  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  //user.emails[0].value
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

const whitelist = ["http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        //for bypassing postman req with  no origin
        return callback(null, true);
      }
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  cookieSession({
    name: "gym-buddy-session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.GYM_BUDDY_SECRET_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));

app.use(express.json());

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("./../swagger.json", import.meta.url))
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/gyms", gymsRouter);
app.use("*", errorRouter);

//app.use(errorHandler);

export { app };
