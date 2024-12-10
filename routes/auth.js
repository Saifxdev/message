const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await Role.findOne({ where: { name: role } });

    if (!userRole) return res.status(400).json({ error: "Invalid role" });

    await User.create({ name, email, phone, password: hashedPassword, RoleId: userRole.id });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;