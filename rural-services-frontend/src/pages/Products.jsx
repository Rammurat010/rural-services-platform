// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductsSection from "../components/ProductsSection";
import { getProducts } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="products-page">
      <Navbar />
      <ProductsSection products={products} />
    </div>
  );
};

export default Products;
