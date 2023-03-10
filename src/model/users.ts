import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["User", "Seller"],
      default: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);