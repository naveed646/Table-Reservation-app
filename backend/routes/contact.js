const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controller/contactController");

router.post("/", createMessage); // user submit
router.get("/", getMessages);    // admin fetch

module.exports = router;
