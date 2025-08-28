// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import ProductsSection from "../components/ProductsSection";
import NewsSection from "../components/NewsSection";
import ContactSection from "../components/ContactSection";
import { getServices, getProducts, getNews } from "../services/api";

const Home = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, productsData, newsData] = await Promise.all([
          getServices(),
          getProducts(),
          getNews(),
        ]);
        setServices(servicesData);
        setProducts(productsData);
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <Navbar />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Welcome to Rural Services Platform</h1>
            <p>Your one-stop solution for all rural needs</p>
          </div>
        </section>

        <ServicesSection services={services} />
        <ProductsSection products={products} />
        <NewsSection news={news} />
        <ContactSection />
      </main>
    </div>
  );
};

export default Home;
