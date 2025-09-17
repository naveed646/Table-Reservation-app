const bcrypt = require("bcrypt");
const User = require("../models/Regiser");
const PendingUser = require("../models/PendingUser");
const { sendEmail } = require("../utils/emailService");

//Register, save user in PendingUser until OTP verified...
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Remove old pending user if exists
    await PendingUser.deleteOne({ email });

    // Save in PendingUser collection
    await PendingUser.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Send OTP email
    await sendEmail(
      email,
      "Verify Your Email",
      `<p>Your OTP code is: <b>${otp}</b> (valid for 5 minutes)</p>`
    );

    res.status(200).json({ message: "OTP sent to your email. Please verify." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP move from PendingUser to User collection
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pending = await PendingUser.findOne({ email });
    if (!pending) {
      return res.status(400).json({ message: "No pending registration found" });
    }

    if (pending.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (pending.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Create verified user
    const user = await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: "user",
      isVerified: true,
    });

    // Remove from PendingUser collection
    await PendingUser.deleteOne({ email });

    // Send welcome email
    await sendEmail(
      user.email,
      "Welcome to Piece on Plate 🎉",
      `
    <h2>Hi ${user.name}, welcome to Piece on Plate! 🍽️</h2>
    <p>
      We're excited to have you join our food-loving community. 
      At <b>Piece on Plate</b>, every dish is more than just a meal it's an experience 
      crafted with passion, fresh ingredients, and a touch of creativity. 
    </p>
    <p>
      Explore our menu, discover new flavors, and let us bring deliciousness straight to your plate.  
    </p>
    <p style="margin-top:20px;">✨ Bon Appétit,<br/>The Piece on Plate Team</p>
  `
    );

    res.status(201).json({
      message: "User verified & registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, verifyOtp };
