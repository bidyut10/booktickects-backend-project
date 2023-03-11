import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const tickectSchema = new mongoose.Schema(
  {
    sellerID: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    showName: {
      type: String,
      required: true,
      trim: true,
    },
    showPlace: {
      type: String,
      required: true,
      trim: true,
    },
    showTime: {
      type: String,
      required: true,
      trim: true,
    },
    showDate: {
      type: String,
      required: true,
      trim: true,
    },
    tickectPrice: {
      type: Number,
      required: true,
      default: 1,
      trim: true,
    },
    totalTickects: {
      type: Number,
      required: true,
      default: 1,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tickect", tickectSchema);
