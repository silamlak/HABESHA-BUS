import mongoose from "mongoose";

const operatorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },

    lname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone_no: {
      type: String,
      required: true,
      unique: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    address: {
      town: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      required: true,
    },
    working_status: {
      type: String,
      enum: ['working', 'not-working', 'rest', 'retired', 'on-hold'],
      default: 'working'
    },
    
  },
  { timestamps: true }
);

export default mongoose.model('Operators', operatorSchema)