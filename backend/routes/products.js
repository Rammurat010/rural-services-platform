// // backend/routes/products.js
// const express = require("express");
// const db = require("../config/database");

// const router = express.Router();

// // Get all products
// router.get("/", (req, res) => {
//   db.query("SELECT * FROM products", (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error" });
//     }
//     res.json(results);
//   });
// });

// module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////

// backend/routes/products.js
const express = require("express");
const db = require("../config/database");

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    // Convert price strings to numbers
    const productsWithNumericPrices = results.map((product) => ({
      ...product,
      price: parseFloat(product.price),
    }));

    res.json(productsWithNumericPrices);
  });
});

module.exports = router;
