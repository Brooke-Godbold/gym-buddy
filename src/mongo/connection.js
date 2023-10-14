import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.GYM_BUDDY_DB_USER}:${process.env.GYM_BUDDY_DB_PASSWORD}@${process.env.GYM_BUDDY_DB_URL}/${process.env.GYM_BUDDY_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectDatabase() {
  await mongoose.connect(MONGO_URL);
}

export { connectDatabase };
