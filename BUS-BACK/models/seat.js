import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  seat_no: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: true
  },
}, {timestamps: true});

export default mongoose.model('Seats', seatSchema);
