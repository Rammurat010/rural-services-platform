// backend/routes/profile.js
const express = require("express");
const auth = require("../middleware/auth");
const db = require("../config/database");

const router = express.Router();

// Get user profile
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT id, name, email, phone FROM users WHERE id = ?",
    [req.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(results[0]);
    }
  );
});

// Update user profile
router.put("/", auth, (req, res) => {
  const { name, email, phone } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, req.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      db.query(
        "SELECT id, name, email, phone FROM users WHERE id = ?",
        [req.userId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Database error" });
          }
          res.json(results[0]);
        }
      );
    }
  );
});

module.exports = router;
