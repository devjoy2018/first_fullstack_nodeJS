const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Get User Profile (Protected Route)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Profile (Protected Route)
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, age, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        $set: { "profile.name": name, "profile.age": age, "profile.bio": bio },
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
