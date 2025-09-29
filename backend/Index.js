const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const ConnectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const menuRoutes =require("./routes/menuRoutes")
const reservationRoutes = require("./routes/reservationRoutes");
const contactRoutes = require("./routes/contact")
const contactInfoRoutes = require("./routes/contactInfoRoutes");
const blogRoutes = require("./routes/blogRoutes")


dotenv.config();
ConnectDB();
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
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-info", contactInfoRoutes);

app.use("/api/blogs", blogRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
   
    console.log(`Server running on http://localhost:${PORT}`);
});
