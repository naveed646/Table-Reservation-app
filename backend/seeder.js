// seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/Regiser");

dotenv.config();

const seedAdmin = async () => {
  try {
    //  db connection..
    await mongoose.connect(process.env.DB_URL);

    // check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists:", adminExists.email);
      process.exit();
    }

    // create new admin
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Naveed",
      email: "naveed@gmail.com",
      password: hashedPassword, 
      role: "admin",
    });

    console.log("Admin created successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

seedAdmin();
