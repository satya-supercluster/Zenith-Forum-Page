// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

const verifyToken = require("../middleware/verifyToken");

// API to handle Google Sign-In (Protected by verifyToken middleware)
router.post("/google", verifyToken, async (req, res) => {
  try {
    const { user_id, name, email, picture } = req.user;

    // Find or create user
    let user = await User.findOne({ googleId: user_id });

    if (!user) {
      user = new User({
        googleId: user_id,
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
