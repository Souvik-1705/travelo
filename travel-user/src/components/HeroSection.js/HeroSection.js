import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();


  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <h1>Discover Your Perfect Stay</h1>
        <p>Villas, Resorts, Treehouses & More</p>
         <button className="hero-cta" onClick={() => navigate("/category")}>
          Explore Categories
         </button>
      </div>
    </section>
  );
}

export default HeroSection;
