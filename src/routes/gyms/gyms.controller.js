import {
  addNewGym,
  getAllGyms,
  getGymById,
} from "../../models/gyms/gyms.model.js";
import {
  addReview,
  getReviewById,
  voteReview,
} from "../../models/reviews/reviews.model.js";
import {
  addEquipment,
  voteEquipmentAccuracy,
  voteEquipmentQuality,
} from "../../models/equipment/equipment.model.js";
import { getPagination } from "../../utils/query.js";

async function httpGetAllGyms(req, res) {
  return res
    .status(200)
    .json(await getAllGyms(req.query?.search, getPagination(req.query)));
}

async function httpGetGymById(req, res) {
  return res.status(200).json(await getGymById(req.params.id));
}

async function httpAddGym(req, res) {
  return res.status(201).json(await addNewGym(req.body));
}

async function httpGetReview(req, res) {
  return res.status(200).json(await getReviewById(req.params.id));
}

async function httpAddReview(req, res) {
  return res.status(201).json(await addReview(req.body, req.params.id));
}

async function httpVoteReview(req, res) {
  return res.status(201).json(await voteReview(req.params.id, req.body));
}

async function httpAddEquipment(req, res) {
  return res.status(201).json(await addEquipment(req.params.id, req.body));
}

async function httpVoteEquipmentQuality(req, res) {
  return res
    .status(201)
    .json(await voteEquipmentQuality(req.params.id, req.body));
}

async function httpVoteEquipmentAccuracy(req, res) {
  return res
    .status(201)
    .json(await voteEquipmentAccuracy(req.params.id, req.body));
}

export {
  httpGetAllGyms,
  httpGetGymById,
  httpAddGym,
  httpGetReview,
  httpAddReview,
  httpVoteReview,
  httpAddEquipment,
  httpVoteEquipmentQuality,
  httpVoteEquipmentAccuracy,
};
