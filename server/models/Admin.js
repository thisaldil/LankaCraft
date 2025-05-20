const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "admin",
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  otp: {
    type: Number,
    default: null,
  },
  role: {
    type: String,
    enum: ["seller", "inventory"],
    default: "seller",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
