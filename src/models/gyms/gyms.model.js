import { getEquipmentByGymId } from "../equipment/equipment.model.js";
import { averageRating, getReviewsByGymId } from "../reviews/reviews.model.js";
import { gyms } from "./gyms.mongo.js";

const DEFAULT_GYM_ID = 0;

async function getLatestGymId() {
  const latestGym = await gyms.findOne({}).sort("-gymId");

  if (!latestGym) {
    return DEFAULT_GYM_ID;
  }

  return latestGym.gymId;
}

async function getAllGyms(searchQuery, { skip, limit }) {
  const query = searchQuery?.trim()?.toLowerCase();

  const matchedGyms = await gyms
    .find(
      query?.length > 2
        ? {
            $or: [
              { name: { $regex: new RegExp(query), $options: "i" } },
              {
                "address.postcode": {
                  $regex: new RegExp(query),
                  $options: "i",
                },
              },
            ],
          }
        : {},
      {
        _id: 0,
        __v: 0,
        "address._id": 0,
      }
    )
    .sort({ gymId: 1 })
    .skip(skip)
    .limit(limit);

  return await Promise.all(
    matchedGyms.map(async (gym) => {
      const reviews = await getReviewsByGymId(gym.toJSON().gymId);

      return {
        ...gym.toJSON(),
        avgRating: averageRating(reviews),
      };
    })
  );
}

async function getGymById(id) {
  const gym = await gyms.findOne(
    { gymId: id },
    { _id: 0, __v: 0, "address._id": 0 }
  );

  const reviews = await getReviewsByGymId(id);
  const equipment = await getEquipmentByGymId(id);

  return gym
    ? {
        ...gym.toJSON(),
        avgRating: averageRating(reviews),
        reviews: reviews,
        equipment: equipment,
      }
    : null;
}

async function addNewGym(gym) {
  const newGymId = (await getLatestGymId()) + 1;

  return await gyms
    .findOneAndUpdate(
      { gymId: newGymId },
      {
        gymId: newGymId,
        ...gym,
        avgRating: null,
      },
      { upsert: true, new: true, returnOriginal: false }
    )
    .select({ _id: 0, __v: 0, "address._id": 0 });
}

export { getAllGyms, getGymById, addNewGym };
