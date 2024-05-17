import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
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
  duration: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Routes", routeSchema);