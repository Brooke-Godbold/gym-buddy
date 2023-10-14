import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

import { gymsRouter } from "./routes/gyms/gyms.router.js";
import { errorRouter } from "./routes/error/error.router.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

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

app.use("/gyms", gymsRouter);
app.use("*", errorRouter);

app.use(errorHandler);

export { app };
