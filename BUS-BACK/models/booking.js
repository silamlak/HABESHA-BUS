import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    passenger_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    routeOfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routes",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
    uniqueId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Bookings', bookingSchema);