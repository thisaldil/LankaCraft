const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  shippingAddress: {
    type: String,
    default: "N/A",
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
