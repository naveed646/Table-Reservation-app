const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    imageUrl: {
      type: String,
      // required: [true, "Blog image is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    imagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);