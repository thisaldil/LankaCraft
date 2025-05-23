const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const customerEmail = req.customerEmail;
    const { items, total, shippingAddress } = req.body;

    const newOrder = new Order({
      customerEmail,
      items,
      total,
      shippingAddress,
      status: "Pending",
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order saving error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};
