import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true,
  },
  routeName: {
    type: String,
    required: true,
    unique: true,
  },
  routeDescription: {
    type: String,
    required: true,
  },
  routeType: {
    type: String,
    required: true,
    enum: ["no-via", "via"],
  },
  starting_city: {
    type: String,
    required: true,
  },
  destination_city: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('')