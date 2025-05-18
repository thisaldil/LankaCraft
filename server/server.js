const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

// Use routes
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

// Start server
if (process.env.NODE_ENV !== "deployment") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
