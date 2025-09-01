const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getMenu, addMenu, deleteMenu, updateMenu } = require("../controller/menuController");

// Configure Multer (uploads to /uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/", getMenu);
router.post("/", upload.single("image"), addMenu);
router.delete("/:id", deleteMenu);
router.put("/:id", upload.single("image"), updateMenu);

module.exports = router;
