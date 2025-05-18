const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Bags", "Jewelry", "Gifts", "Wall Arts"],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      enum: [
        "Black",
        "Brown",
        "Navy Blue",
        "Gray",
        "Tan",
        "Caramel Brown",
        "Multicolor",
        "Silver",
        "Gold",
      ],
      required: false,
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large", "One Size", "Custom"],
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0, // % off
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 10,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
