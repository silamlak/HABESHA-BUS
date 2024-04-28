import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings',
        required: true,
    },
    amount: {
        type: Number,
        required: true
      },
  },
  { timestamps: true }
);

export default mongoose.model('Payments', paymentSchema)