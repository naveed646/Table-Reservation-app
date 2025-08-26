const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const Connect_DB = require("./conifg/db"); 
const authRoutes = require("./routes/authRoutes");
const menuRoutes =require("./routes/menuRoutes")

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    Connect_DB();
    console.log(`Server running on http://localhost:${PORT}`);
});
