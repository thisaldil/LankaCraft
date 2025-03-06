const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const admin = require("./routes/adminRoutes");

// Use routes
app.use("/admin", admin);

// DB connection
connectDB();

// Server listen
if (process.env.NODE_ENV !== "deployment") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
