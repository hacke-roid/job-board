// server/routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs"); // Use bcryptjs here
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path based on your project structure
const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const newUser = new User({ name, phone, email, password }); // Add phone number to the user
    await newUser.save(); // Save user to the database
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
});


module.exports = router;
