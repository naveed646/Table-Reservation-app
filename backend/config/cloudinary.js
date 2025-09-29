const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload krne wala
const uploadToCloudinary = async (file, folder = "BlogImages") => {
  try {
    if (!file) {
      return { success: false, message: "No file provided" };
    }

    let filePath;
    if (typeof file === "string") {
      filePath = file;
    } else if (file?.path) {
      filePath = file.path;
    } else {
      return { success: false, message: "Invalid file input" };
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete krne wala
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      return { success: false, message: "No publicId provided" };
    }

    await cloudinary.uploader.destroy(publicId);
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { cloudinary, uploadToCloudinary, deleteFromCloudinary };
