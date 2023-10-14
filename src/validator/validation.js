import { matchedData, param, validationResult } from "express-validator";
import { booleanRule, integerRule, stringRule } from "./rules.js";
import { getGymById } from "../models/gyms/gyms.model.js";
import {
  getReviewById,
  getReviewByUserId,
} from "../models/reviews/reviews.model.js";
import { getEquipmentById } from "../models/equipment/equipment.model.js";

const getGymRules = [
  param("id")
    .custom(async (value) => {
      const gym = await getGymById(value);
      if (!gym) return Promise.reject();
    })
    .withMessage((value) => `Unable to find gym resource with gymId ${value}`),
];

const gymRules = [
  stringRule("name"),
  stringRule("address.line1"),
  stringRule("address.line2", true),
  stringRule("address.city"),
  stringRule("address.county"),
  stringRule("address.postcode"),
];

const getReviewRules = [
  param("id")
    .custom(async (value) => {
      const review = await getReviewById(value);
      if (!review) return Promise.reject();
    })
    .withMessage(
      (value) => `Unable to find review resource with reviewId ${value}`
    ),
];

const addReviewRules = [
  integerRule("userId", false, 0),
  integerRule("rating", false, 0, 10),
  stringRule("content"),
  param("id")
    .custom(async (value) => {
      const gym = await getGymById(value);
      if (!gym) return Promise.reject();
    })
    .withMessage((value) => `Unable to find gym resource with gymId ${value}`),
  param("id")
    .custom(async (value, { req }) => {
      const existingUserReview = await getReviewByUserId(
        value,
        req.body.userId
      );
      if (existingUserReview) return Promise.reject();
    })
    .withMessage(
      (value, { req }) =>
        `Existing review found for gymId ${value} and userId ${req.body.userId}`
    ),
];

const voteReviewRules = [
  integerRule("userId", false, 0),
  param("id")
    .custom(async (value) => {
      const review = await getReviewById(value);
      if (!review) return Promise.reject();
    })
    .withMessage(
      (value) => `Unable to find review resource with reviewId ${value}`
    ),
  param("id")
    .custom(async (value, { req }) => {
      const review = await getReviewById(value);
      if (review?.userId === Number(req.body.userId)) return Promise.reject();
    })
    .withMessage(
      (value, { req }) =>
        `Unable to add userId ${req.body.userId} vote for review owned by userId ${req.body.userId}`
    ),
];

const addEquipmentRules = [
  stringRule("name"),
  integerRule("userId", false, 0),
  integerRule("quality.userId", false, 0),
  integerRule("quality.rating", false, 0, 10),
  param("id")
    .custom(async (value) => {
      const gym = await getGymById(value);
      if (!gym) return Promise.reject();
    })
    .withMessage((value) => `Unable to find gym resource with gymId ${value}`),
];

const voteEquipmentQualityRules = [
  integerRule("userId", false, 0),
  integerRule("rating", false, 0, 10),
  param("id")
    .custom(async (value) => {
      const equipment = await getEquipmentById(value);
      if (!equipment) return Promise.reject();
    })
    .withMessage(
      (value) => `Unable to find equipment resource with equipmentId ${value}`
    ),
];

const voteEquipmentAccuracyRules = [
  integerRule("userId", false, 0),
  booleanRule("isCorrect"),
  param("id")
    .custom(async (value) => {
      const equipment = await getEquipmentById(value);
      if (!equipment) return Promise.reject();
    })
    .withMessage(
      (value) => `Unable to find equipment resource with equipmentId ${value}`
    ),
  param("id")
    .custom(async (value, { req }) => {
      const equipment = await getEquipmentById(value);
      if (equipment?.userId === Number(req.body.userId))
        return Promise.reject();
    })
    .withMessage(
      (value, { req }) =>
        `Unable to add userId ${req.body.userId} accuracy for equipment owned by userId ${req.body.userId}`
    ),
];

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      errors: result.array().map((error) => {
        return {
          errorType: error.type,
          errorValue: error.value,
          errorMessage: error.msg,
        };
      }),
    });
  }

  req.body = matchedData(req, { includeOptionals: true });

  next();
};

export {
  validate,
  getGymRules,
  gymRules,
  getReviewRules,
  addReviewRules,
  voteReviewRules,
  addEquipmentRules,
  voteEquipmentQualityRules,
  voteEquipmentAccuracyRules,
};
