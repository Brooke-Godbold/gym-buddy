import { equipment } from "./equipment.mongo.js";

const DEFAULT_EQUIPMENT_ID = 0;

async function getLatestEquipmentId() {
  const latestEquipment = await equipment.findOne({}).sort("-equipmentId");

  if (!latestEquipment) {
    return DEFAULT_EQUIPMENT_ID;
  }

  return latestEquipment.equipmentId;
}

async function getEquipmentById(equipmentId) {
  return await equipment.findOne(
    { equipmentId: equipmentId },
    { _id: 0, __v: 0 }
  );
}

async function getEquipmentByGymId(gymId) {
  return await equipment.find(
    { gymId: gymId },
    { _id: 0, __v: 0, "quality._id": 0, "accuracy._id": 0 }
  );
}

async function addEquipment(gymId, equipmentValues) {
  const newEquipmentId = (await getLatestEquipmentId()) + 1;

  const newEquipment = {
    equipmentId: newEquipmentId,
    gymId: Number(gymId),
    userId: Number(equipmentValues.userId),
    name: equipmentValues.name,
    quality: [equipmentValues.quality],
    accuracy: [],
  };

  return await equipment
    .findOneAndUpdate({ equipmentId: newEquipmentId }, newEquipment, {
      upsert: true,
      new: true,
      returnOriginal: false,
    })
    .select({ _id: 0, __v: 0, "quality._id": 0 });
}

async function voteEquipmentQuality(equipmentId, quality) {
  const userId = Number(quality.userId);

  const matchedEquipment = await equipment.findOne({
    equipmentId: equipmentId,
  });

  const updatedQualityVotes = matchedEquipment
    .toJSON()
    .quality.find((vote) => vote.userId === userId)
    ? matchedEquipment.toJSON().quality.map((vote) =>
        vote.userId === userId
          ? {
              userId: Number(quality.userId),
              rating: Number(quality.rating),
            }
          : vote
      )
    : [
        ...matchedEquipment.toJSON().quality,
        { userId: Number(quality.userId), rating: Number(quality.rating) },
      ];

  return await equipment
    .findOneAndUpdate(
      { equipmentId: equipmentId },
      { quality: updatedQualityVotes },
      { new: true, returnOriginal: false }
    )
    .select({ _id: 0, __v: 0, "quality._id": 0, "accuracy._id": 0 });
}

async function voteEquipmentAccuracy(equipmentId, accuracy) {
  const userId = Number(accuracy.userId);

  const matchedEquipment = await equipment.findOne({
    equipmentId: equipmentId,
  });

  const updatedAccuracyVotes = matchedEquipment
    .toJSON()
    .accuracy.find((vote) => vote.userId === userId)
    ? matchedEquipment.toJSON().accuracy.map((vote) =>
        vote.userId === userId
          ? {
              userId: Number(accuracy.userId),
              isCorrect: accuracy.isCorrect,
            }
          : vote
      )
    : [
        ...matchedEquipment.toJSON().accuracy,
        { userId: Number(accuracy.userId), isCorrect: accuracy.isCorrect },
      ];

  return await equipment
    .findOneAndUpdate(
      { equipmentId: equipmentId },
      { accuracy: updatedAccuracyVotes },
      { new: true, returnOriginal: false }
    )
    .select({ _id: 0, __v: 0, "quality._id": 0, "accuracy._id": 0 });
}

export {
  getEquipmentById,
  getEquipmentByGymId,
  addEquipment,
  voteEquipmentQuality,
  voteEquipmentAccuracy,
};
