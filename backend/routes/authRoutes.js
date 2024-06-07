// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const admin = require("../config/firebase-config");

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};

// API to handle Google Sign-In (Protected by verifyToken middleware)
router.post("/google", verifyToken, async (req, res) => {
  try {
    const { uid, name, email, picture } = req.user;

    // Find or create user
    let user = await User.findOne({ googleId: uid });

    if (!user) {
      user = new User({
        googleId: uid,
        name: name || "Anonymous",
        email: email || "noemail@example.com",
        avatar: picture || '/avatar.png',
      });
      await user.save();
      console.log("New user created:", user.name);
    } else {
      console.log("User logged in:", user.name);
      // Optionally update last login time, etc.
    }

    // Generate a session token or JWT here if needed

    res.status(200).json({
      message: user ? "User logged in" : "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error in Google user creation/login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
