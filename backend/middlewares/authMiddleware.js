const jwt = require("jsonwebtoken");
const User = require("../models/Regiser");

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("+password");

      if (!user) {
        console.log("User not found for ID:", decoded.id);
        return res.status(401).json({ message: "User not found" });
      }

      // 🔑 Check if password was changed after token issued
      if (user.passwordChangedAt) {
        const passwordChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
        if (decoded.iat < passwordChangedTimestamp) {
          return res.status(401).json({
            message: "Password recently changed. Please log in again.",
          });
        }
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log("⚠️ No token found in headers");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin only
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, admin };
