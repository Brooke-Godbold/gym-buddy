import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  googleId: {
    type: Number,
    required: true,
  },
});

const users = mongoose.model("User", usersSchema);

export { users };
