import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buses',
    required: true
  },
}, {timestamps: true});

export default mongoose.model('Routes', routeSchema);
