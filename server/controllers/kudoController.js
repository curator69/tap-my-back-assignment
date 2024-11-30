const Kudo = require("../models/Kudo");

// Create new kudo
const createKudo = async (req, res) => {
  try {
    const { receiver, message, category } = req.body;

    const kudo = await Kudo.create({
      sender: req.user._id,
      receiver,
      message,
      category,
    });

    const populatedKudo = await Kudo.findById(kudo._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    res.status(201).json(populatedKudo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all kudos
const getAllKudos = async (req, res) => {
  try {
    const kudos = await Kudo.find()
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.json(kudos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user kudos
const getUserKudos = async (req, res) => {
  try {
    const kudos = await Kudo.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.json(kudos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createKudo,
  getAllKudos,
  getUserKudos,
};
