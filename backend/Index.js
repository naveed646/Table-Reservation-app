const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Connect_DB = require("./conifg/db"); 
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    Connect_DB();
    console.log(`Server running on http://localhost:${PORT}`);
});
