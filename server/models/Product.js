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
      enum: ["Traditional Bags", "Jewelry", "Gifts", "Wall Arts"],
      required: true,
    },
    subcategory: {
      type: String,
      enum: [
        "Leather Travel Bags",
        "Canvas Duffels",
        "Traditional Backpacks",
        "Handwoven Carriers",
        "Market Totes",
        "Woven Baskets",
        "Traditional Pouches",
        "Eco-friendly Bags",
        "Evening Clutches",
        "Embroidered Bags",
        "Traditional Wallets",
        "Festival Bags",
        "Traditional Necklaces",
        "Ethnic Bracelets",
        "Cultural Rings",
        "Prayer Beads",
        "Statement Necklaces",
        "Heritage Pieces",
        "Tribal Jewelry",
        "Handcrafted Earrings",
        "Personalized Keepsakes",
        "Handmade Cards",
        "Cultural Gift Boxes",
        "Traditional Goodies",
        "Assorted Treat Packs",
        "Custom Sweet Hampers",
        "Festive Wrapped Boxes",
        "Organic Confections",
        "Holiday Hampers",
        "Seasonal Gift Sets",
        "Ethnic Celebration Boxes",
        "Curated Artisan Combos",
        "Abstract Canvas",
        "Floral Canvas",
        "Traditional Motifs",
        "Minimalist Art",
      ],
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
    sellerUsername: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
