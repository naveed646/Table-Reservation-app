// models/Menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Menu", menuSchema);
