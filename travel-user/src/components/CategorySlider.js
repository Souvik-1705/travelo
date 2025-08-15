import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import "../styles/CategorySlider.css";

function CategorySlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading categories...</p>;

  return (
    <div className="slider-container">
      {categories.map((cat) => (
        <div
          className="category-card"
          key={cat.id}
          onClick={() => navigate(`/category/${cat.id}`)}
        >
          <h4>{cat.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default CategorySlider;
