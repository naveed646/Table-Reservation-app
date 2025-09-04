const express = require("express");
const router = express.Router();
const { getContactInfo, updateContactInfo } = require("../controller/contactInfoController");

// Public route
router.get("/", getContactInfo);

// Admin route (you can add auth middleware later)
router.put("/", updateContactInfo);

module.exports = router;
