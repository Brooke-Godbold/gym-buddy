import express from "express";
import { pathErrorHandler } from "./error.controller.js";

const errorRouter = express.Router();

errorRouter.get("*", pathErrorHandler);
errorRouter.post("*", pathErrorHandler);
errorRouter.put("*", pathErrorHandler);
errorRouter.patch("*", pathErrorHandler);
errorRouter.delete("*", pathErrorHandler);

export { errorRouter };
