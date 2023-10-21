import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
});

const gymsSchema = new mongoose.Schema({
  gymId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const gyms = mongoose.model("Gym", gymsSchema);

export { gyms };
