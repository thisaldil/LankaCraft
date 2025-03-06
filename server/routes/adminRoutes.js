const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const {
  adminLogin,
  registerAdmin,
  requestOtp,
  changePassword,
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

module.exports = router;
