// backend/routes/news.js
const express = require("express");
const db = require("../config/database");

const router = express.Router();

// Get all news
router.get("/", (req, res) => {
  db.query("SELECT * FROM news ORDER BY date DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
