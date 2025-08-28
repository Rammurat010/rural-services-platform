// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              return res.status(500).json({ message: "Database error" });
            }

            // Generate token
            const token = jwt.sign(
              { userId: results.insertId },
              process.env.JWT_SECRET || "your-secret-key",
              { expiresIn: "24h" }
            );

            res.status(201).json({
              message: "User created successfully",
              token,
              user: { id: results.insertId, name, email },
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "24h" }
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
