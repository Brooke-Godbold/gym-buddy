import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  reviewId: {
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
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  votes: {
    type: [Number],
    required: true,
  },
});

const reviews = mongoose.model("Review", reviewsSchema);

export { reviews };
