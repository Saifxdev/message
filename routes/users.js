const express = require("express");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get All Users
router.get("/", authenticate, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Update User
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } });
  res.json({ message: "User updated successfully" });
});

// Delete User
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: "User deleted successfully" });
});

module.exports = router;