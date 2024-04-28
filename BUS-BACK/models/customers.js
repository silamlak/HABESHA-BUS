import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    passport_info: {

      basic_info: {
        title: {
          type: String,
          default: "",
        },
        first_name: {
          type: String,
          required: true,
        },
        last_name: {
          type: String,
          required: true,
        },
        dob: {
          type: String,
          required: true,
        },
      },

      contact_info: {
        country_code: {
          type: String,
          required: true,
        },
        phone_number: {
          type: String,
          required: true,
        },
      },

    },

    consent_info: {
      operational_updates: {
        type: Boolean,
        default: false,
      },
      marketing_info: {
        type: Boolean,
        default: false,
      },
    },

    account_info: {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },

    complete_agreement: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Customers', customerSchema)