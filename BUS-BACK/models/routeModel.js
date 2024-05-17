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
  cost: {
    type: Number,
    required: true
  },

  busId: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now()
  },
}, {timestamps: true});

export default mongoose.model('Routes', routeSchema);
