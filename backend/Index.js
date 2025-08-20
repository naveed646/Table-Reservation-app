const express = require("express");
const dotenv = require("dotenv");
const Connect_DB = require("./conifg/db"); 

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    Connect_DB()
  console.log(`Server running on http://localhost:${PORT}`);
});
