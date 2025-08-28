// backend/routes/cart.js
const express = require("express");
const auth = require("../middleware/auth");
const db = require("../config/database");

const router = express.Router();

// Get user's cart
router.get("/", auth, (req, res) => {
  db.query(
    `SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.image 
     FROM cart c 
     JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = ?`,
    [req.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      // Convert price strings to numbers
      const cartItemsWithNumericPrices = results.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));

      res.json(cartItemsWithNumericPrices);
    }
  );
});

// Add to cart
router.post("/", auth, (req, res) => {
  const { productId, quantity } = req.body;

  // Check if product already in cart
  db.query(
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
    [req.userId, productId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        // Update quantity if product already in cart
        const newQuantity = results[0].quantity + quantity;
        db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [newQuantity, results[0].id],
          (err, updateResults) => {
            if (err) {
              return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "Cart updated successfully" });
          }
        );
      } else {
        // Add new item to cart
        db.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
          [req.userId, productId, quantity],
          (err, insertResults) => {
            if (err) {
              return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "Product added to cart" });
          }
        );
      }
    }
  );
});

module.exports = router;
