import express from "express";
import {
  httpAddEquipment,
  httpAddGym,
  httpAddReview,
  httpGetAllGyms,
  httpGetGymById,
  httpGetReview,
  httpVoteEquipmentAccuracy,
  httpVoteEquipmentQuality,
  httpVoteReview,
} from "./gyms.controller.js";
import {
  gymRules,
  addReviewRules,
  validate,
  voteReviewRules,
  addEquipmentRules,
  voteEquipmentAccuracyRules,
  voteEquipmentQualityRules,
  getGymRules,
  getReviewRules,
} from "../../validator/validation.js";
import { authCheck } from "../../middleware/authHandler.js";

const gymsRouter = express.Router();

gymsRouter.get("/", httpGetAllGyms);
gymsRouter.get("/:id", getGymRules, validate, httpGetGymById);

gymsRouter.post("/", gymRules, validate, authCheck, httpAddGym);

gymsRouter.put(
  "/:id/reviews",
  addReviewRules,
  validate,
  authCheck,
  httpAddReview
);

gymsRouter.get("/reviews/:id", getReviewRules, validate, httpGetReview);
gymsRouter.patch(
  "/reviews/:id",
  voteReviewRules,
  validate,
  authCheck,
  httpVoteReview
);

gymsRouter.post(
  "/:id/equipment",
  addEquipmentRules,
  validate,
  authCheck,
  httpAddEquipment
);
gymsRouter.put(
  "/equipment/:id/quality",
  voteEquipmentQualityRules,
  validate,
  authCheck,
  httpVoteEquipmentQuality
);
gymsRouter.put(
  "/equipment/:id/accuracy",
  voteEquipmentAccuracyRules,
  validate,
  authCheck,
  httpVoteEquipmentAccuracy
);

export { gymsRouter };
