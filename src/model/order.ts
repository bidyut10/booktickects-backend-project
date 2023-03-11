import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema(
  {
    ticketID: {
      type: ObjectId,
      ref: "Tickect",
      required: true,
      trim: true,
    },
    userID: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    noOfTickects: {
      type: Number,
      required: true,
      default: 1,
      minLength: 1,
      maxLength: 10,
      trim: true,
    },
    isCancled: {
      type: Boolean,
      required: true,
      default: false,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
