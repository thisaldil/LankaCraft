const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const {
  adminLogin,
  registerAdmin,
  requestOtp,
  changePassword,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

// //tours
// router.post("/createTour", createTour);
// router.get("/getAllTours", getAllTours);
// router.get("/getSingleTour/:id", getSingleTour);
// router.put("/updateTour/:id", updateTour);
// router.delete("/deleteTour/:id", deleteTour);

//auth
router.post("/adminLogin", adminLogin);
router.post("/registerAdmin", registerAdmin);
router.post("/requestOtp", requestOtp);
router.post("/changePassword", changePassword);

// Get all users
router.get("/all", getAllAdmins);

// Update user
router.put("/:id", updateAdmin);

// Delete user
router.delete("/:id", deleteAdmin);

module.exports = router;
