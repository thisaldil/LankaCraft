const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Admin = require("../models/Admin");

//login admin
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    admin.token = token;
    await admin.save();

    // ✅ Include role, username, email
    res.status(200).json({
      message: "Login successful",
      token,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

//register admin
exports.registerAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const admin = await Admin.findOne({
      username,
    });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: role || "seller",
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

//request otp via email
exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    await admin.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset OTP",
      text: `Your OTP is ${otp}. It will expire in 15 minutes.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error sending OTP", error: error.message });
      }
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error requesting OTP", error: error.message });
  }
};

//change password
exports.changePassword = async (req, res) => {
  const { username, otp, newPassword } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (otp !== admin.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    admin.password = hashedPassword;
    await admin.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error changing password", error: error.message });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // exclude passwords
    res.status(200).json(admins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Update user by ID
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, runValidators: true }
    );
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin updated", admin });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete user by ID
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};
