const express = require("express");
const { registerUser } = require("../controller/registerUser");
const { loginUser } = require("../controller/loginUser");
const {protect, admin} = require("../middlewares/authMiddleware");
const {updateMe, updateAvatar} =require("../controller/userController")
const multer = require("multer");
const path = require("path");


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id + path.extname(file.originalname)); // userId.png
  },
});
const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user); 
});

router.put("/me", protect, updateMe);
router.put("/me/avatar", protect, upload.single("avatar"), updateAvatar);

// Admin only route
router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});



module.exports = router;
