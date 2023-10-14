import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const accuracySchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const equipmentSchema = new mongoose.Schema({
  equipmentId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  gymId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quality: {
    type: [qualitySchema],
    required: true,
  },
  accuracy: {
    type: [accuracySchema],
    required: true,
  },
});

const equipment = mongoose.model("Equipment", equipmentSchema);

export { equipment };
