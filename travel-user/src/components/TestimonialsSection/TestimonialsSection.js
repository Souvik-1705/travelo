import React from "react";
import "./TestimonialsSection.css";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      feedback: "TravelStay made my trip so easy! The booking process was smooth and quick.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Verma",
      feedback: "Beautiful stays at affordable prices. Customer service is excellent!",
      rating: 4,
    },
    {
      id: 3,
      name: "Rohit Sen",
      feedback: "Found my dream vacation home here. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="testimonials-container">
      <h2>🌟 What Our Users Say</h2>
      <div className="testimonials-grid">
        {reviews.map((review) => (
          <div key={review.id} className="testimonial-card">
            <p className="feedback">“{review.feedback}”</p>
            <div className="rating">
              {"⭐".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
            <p className="name">- {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
