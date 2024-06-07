// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Fetch a user with their posts
router.get("/users", async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("posts");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
