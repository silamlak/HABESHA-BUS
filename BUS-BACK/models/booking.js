import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    bid: {
        type: String,
        required: true,
        unique: true,
    },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: true
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buses',
    required: true
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Routes',
    required: true
  },
  seatNumbers: {
    type: [String],
    required: true
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payments',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
}, {timestamps: true});

export default mongoose.model('Bookings', bookingSchema);