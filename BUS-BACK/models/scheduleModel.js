import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  route_id: {
    type: String,
    required: true
  },
  bus_id: {
    type: String,
    required: true
  },
  schedule_date: {
    type: Date,
    required: true
  },
  schedule_status: {
    type: String,
    enum: ['active', 'on-hold', 'deactivated'],
    default: 'active'
  },
}, {timestamps: true});

export default mongoose.model("Schedules", scheduleSchema);
