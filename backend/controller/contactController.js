const Contact = require("../models/Contact");

// Save a new message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.clearAllMessages = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ success: true, message: "All messages cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear messages" });
  }};

  exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete message" });
  }
};
