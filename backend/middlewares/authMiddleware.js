const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc Middleware to Protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({
        message: "Not authorized, missing token",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

// @desc Middleware to Admin routes
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, adminOnly };
