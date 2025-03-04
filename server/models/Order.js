// routes/orderRoutes.js
const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;
    const order = new Order({ user, products, totalPrice });
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
