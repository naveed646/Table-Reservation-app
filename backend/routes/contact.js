const express = require("express");
const router = express.Router();
const { createMessage, getMessages, clearAllMessages, deleteMessage  } = require("../controller/contactController");

router.post("/", createMessage); // user submit
router.get("/", getMessages);    // admin fetch
router.delete("/clear", clearAllMessages);
router.delete("/:id", deleteMessage);

module.exports = router;
