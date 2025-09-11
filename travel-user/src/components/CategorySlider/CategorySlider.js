import React from "react";
import { Link } from "react-router-dom";
import "./CategorySlider.css";


function CategorySlider({ categories }) {
  if (!categories || categories.length === 0) {
    return <p className="loading">No categories found.</p>;
  }

  return (
    <div className="category-slider">
      {categories.map((cat) => (
        <Link key={cat.id} to={`/category/${cat.id}`} className="category-item">
          {cat.image ? (
            <img
              src={cat.image}
              alt={cat.name}
              className="category-image"
            />
          ) : (
            <div className="category-placeholder">No Image</div>
          )}
          <span className="category-name">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default CategorySlider;
