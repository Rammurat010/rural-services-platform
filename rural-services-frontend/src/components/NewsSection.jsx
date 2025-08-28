// src/components/NewsSection.jsx
import React from "react";

const NewsSection = ({ news }) => {
  return (
    <section id="news" className="news-section">
      <div className="container">
        <h2>News & Updates</h2>
        <div className="news-list">
          {news.map((item) => (
            <div key={item.id} className="news-item">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <span className="news-date">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
