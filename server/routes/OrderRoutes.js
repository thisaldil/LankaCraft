const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");
const verifyFirebaseToken = require("../middleware/firebaseAuth");

router.post("/place", verifyFirebaseToken, placeOrder);

module.exports = router;
