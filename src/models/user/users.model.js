import { users } from "./users.mongo.js";

const DEFAULT_USER_ID = 0;

async function getLatestUserId() {
  const latestUser = await users.findOne({}).sort("-userId");

  if (!latestUser) {
    return DEFAULT_USER_ID;
  }

  return latestUser.userId;
}

async function getUserByGoogleId(googleId) {
  return await users.findOne(
    { googleId: Number(googleId) },
    { _id: 0, __v: 0 }
  );
}

async function createUser(googleId) {
  const newUserId = (await getLatestUserId()) + 1;

  console.log("NEW USER ID: ", newUserId);

  const newUser = {
    userId: Number(newUserId),
    googleId: Number(googleId),
  };

  await users.create(newUser);
}

export { getUserByGoogleId, createUser };
