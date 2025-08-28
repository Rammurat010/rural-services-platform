// backend/routes/services.js
const express = require("express");
const db = require("../config/database");

const router = express.Router();

// Get all services
router.get("/", (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
