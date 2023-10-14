import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongoServer = await MongoMemoryServer.create();

async function connectMongoTestServer() {
  await mongoose.connect(mongoServer.getUri(), { dbName: "Gyms" });
}

async function disconnectMongoTestServer() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

export { connectMongoTestServer, disconnectMongoTestServer };
