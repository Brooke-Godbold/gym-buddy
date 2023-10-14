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

const gymsRouter = express.Router();

gymsRouter.get("/", httpGetAllGyms);
gymsRouter.get("/:id", getGymRules, validate, httpGetGymById);

gymsRouter.post("/", gymRules, validate, httpAddGym);

gymsRouter.post("/:id/reviews", addReviewRules, validate, httpAddReview);

gymsRouter.get("/reviews/:id", getReviewRules, validate, httpGetReview);
gymsRouter.patch("/reviews/:id", voteReviewRules, validate, httpVoteReview);

gymsRouter.post(
  "/:id/equipment",
  addEquipmentRules,
  validate,
  httpAddEquipment
);
gymsRouter.put(
  "/equipment/:id/quality",
  voteEquipmentQualityRules,
  validate,
  httpVoteEquipmentQuality
);
gymsRouter.put(
  "/equipment/:id/accuracy",
  voteEquipmentAccuracyRules,
  validate,
  httpVoteEquipmentAccuracy
);

export { gymsRouter };
