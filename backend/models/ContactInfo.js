const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  openingHours: { type: String, required: true },
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
