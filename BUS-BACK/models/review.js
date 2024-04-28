import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviwer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true,
    },
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings',
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('Reviews', reviewSchema)