const express = require("express");
const { registerUser } = require("../controller/registerUser");
const { loginUser } = require("../controller/loginUser");
const {protect, admin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user); 
});

// Admin only route
router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

module.exports = router;
