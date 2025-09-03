const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference logged-in user
      required: true,
    },
    tableId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
    time: {
      type: String, // hh:mm
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "90",
    },
    guests: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);


