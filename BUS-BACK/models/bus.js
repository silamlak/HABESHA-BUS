import mongoose from 'mongoose'

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  registerd: {
    type: Date,
    default: Date.now()
  },
  bus_status: {
    type: String,
    enum: ['on-maintenance', 'on-service', 'out-of-service'],
    default: 'on-service'
  },
}, {timestamps: true});

export default mongoose.model('Buses', busSchema);
