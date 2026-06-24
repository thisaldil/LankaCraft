// seedProducts.js
// One-time script to bulk insert sample products.
// Place this in your /server directory (same level as server.js) and run: node seedProducts.js

const mongoose = require("mongoose");
const connectDB = require("./database");
const Product = require("./models/Product");
const products = require("./lankacraft-products-seed-data.json");

const run = async () => {
  await connectDB();

  try {
    await Product.deleteMany({}); // optional: clears existing products before reseeding
    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products successfully.`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
