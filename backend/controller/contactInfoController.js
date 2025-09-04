const ContactInfo = require("../models/ContactInfo");

// Get Contact Info
exports.getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Contact Info (Admin)
exports.updateContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = new ContactInfo(req.body);
    } else {
      info.phone = req.body.phone;
      info.email = req.body.email;
      info.location = req.body.location;
      info.openingHours = req.body.openingHours;
    }
    await info.save();
    res.json({ message: "Updated successfully", info });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
