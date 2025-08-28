// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database");

// Route imports
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const productRoutes = require("./routes/products");
const newsRoutes = require("./routes/news");
const contactRoutes = require("./routes/contact");
const profileRoutes = require("./routes/profile");
const cartRoutes = require("./routes/cart");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cart", cartRoutes);

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + db.threadId);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
