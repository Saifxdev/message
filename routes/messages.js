const express = require("express");
const Message = require("../models/Message");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Get Messages
router.get("/", authenticate, async (req, res) => {
  const messages = await Message.findAll({
    where: { receiverId: req.user.id },
  });
  res.json(messages);
});

// Send Message
router.post("/", authenticate, async (req, res) => {
  const { receiverId, content } = req.body;
  await Message.create({ senderId: req.user.id, receiverId, content });
  res.json({ message: "Message sent successfully" });
});

module.exports = router;