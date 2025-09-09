import React from "react";
import { Link } from "react-router-dom";
import "./CategorySlider.css";


const categoryImages = {
  Villa: "https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fHww?auto=format&fit=crop&w=400&q=60",
  Houseboat: "https://plus.unsplash.com/premium_photo-1697729600773-5b039ef17f3b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2Vib2F0fGVufDB8fDB8fHww?auto=format&fit=crop&w=400&q=60",
  Appartment: "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=400&q=60",
  Cottage: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=400&q=60",
  Bungalow: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=60",
  Farmhouse: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=60",
  Guesthouse: "https://images.unsplash.com/photo-1598565278384-43185f164faf?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGd1ZXN0aG91c2V8ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=400&q=60",
  "Beach House": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=400&q=60",
  Treehouse: "https://images.unsplash.com/photo-1618767689159-1bfda407947b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHJlZSUyMEhvdXNlfGVufDB8fDB8fHww?auto=format&fit=crop&w=400&q=60",
  Resort: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJlc29ydHxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=400&q=60",
  "Luxury Suite": "https://plus.unsplash.com/premium_photo-1673014202228-65e0e9064a34?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4YXJ5JTIwc3VpdGV8ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=400&q=60",
};

function CategorySlider({ categories }) {
  if (!categories || categories.length === 0) {
    return <p className="loading">No categories found.</p>;
  }

  return (
    <div className="category-slider">
      {categories.map((cat) => (
        <Link key={cat.id} to={`/category/${cat.id}`} className="category-item">
          <img
            src={categoryImages[cat.name]}
            alt={cat.name}
            className="category-image"
          />
          <span className="category-name">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default CategorySlider;
