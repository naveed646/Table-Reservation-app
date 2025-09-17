const bcrypt = require("bcrypt");
const User = require("../models/Regiser"); // your User model
const ResetToken = require("../models/ResetToken");
const { sendEmail } = require("../utils/emailService");

//Forgot Password Send OTP
const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    if (typeof email === "object" && email.email) {
      email = email.email; 
    }

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTP if any
    await ResetToken.deleteOne({ email });

    // Save new OTP with 5 min expiry
    await ResetToken.create({
      email,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    // Send email
    await sendEmail(
      email,
      "Password Reset OTP",
      `<p>Your OTP is: <b>${otp}</b> (valid for 5 minutes)</p>`
    );

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Reset Password with OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const token = await ResetToken.findOne({ email });
    if (!token) return res.status(400).json({ message: "No reset request found" });

    if (token.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (token.otpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await User.updateOne({ email }, { password: hashedPassword });

    // Delete used OTP
    await ResetToken.deleteOne({ email });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { forgotPassword, resetPassword };
