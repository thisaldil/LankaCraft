const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Force reliable DNS resolution for the Atlas SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

// URI in the .env file
const uri = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    if (process.env.NODE_ENV !== "deployment") {
      console.log("Database connection success");
    }
  } catch (err) {
    console.error("Database connection error: " + err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;