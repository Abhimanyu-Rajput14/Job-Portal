import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Trims whitespace
    },
    description: {
      type: String,
      trim: true, // Trims whitespace
    },
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    location: {
      type: String,
      trim: true, // Trims whitespace
    },
    logo: {
      type: String, // URL to company logo
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);