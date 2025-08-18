import mongoose from "mongoose";

const passwordRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      expires: "1d",
    },
  },
  { timestamps: true }
);

const PasswordRequest = mongoose.model(
  "PasswordRequest",
  passwordRequestSchema
);

export default PasswordRequest;
