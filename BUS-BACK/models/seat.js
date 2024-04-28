import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
}, {timestamps: true});

export default mongoose.model('Seats', seatSchema);
