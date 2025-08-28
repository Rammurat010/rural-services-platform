// backend/routes/contact.js
const express = require("express");
const db = require("../config/database");

const router = express.Router();

// Submit contact form
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Message sent successfully" });
    }
  );
});

module.exports = router;
