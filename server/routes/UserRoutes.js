// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const {
  adminLogin,
  registerAdmin,
  requestOtp,
  changePassword,
} = require("../controllers/adminController");

//auth
router.post("/adminLogin", adminLogin);
router.post("/registerAdmin", registerAdmin);
router.post("/requestOtp", requestOtp);
router.post("/changePassword", changePassword);

module.exports = router;
