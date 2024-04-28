import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    n_type: {
        type: String,
        enum: ['comformation', 'schedule'],
        required: true,
    },
    notification: {
        type: String,
        required: true
    }
  },
{ timestamps: true }
);

export default mongoose.model('Notifications', notificationSchema)