// src/components/ProductsSection.jsx
import React, { useState } from "react";

const ProductsSection = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure price is treated as a number
  const productsWithNumericPrices = products.map((product) => ({
    ...product,
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
  }));

  const filteredProducts = productsWithNumericPrices.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="products" className="products-section">
      <div className="container">
        <h2>Available Products</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">
                $
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : "0.00"}
              </p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
