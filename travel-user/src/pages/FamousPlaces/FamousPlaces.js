import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slices/citySlice";
import { Link } from "react-router-dom";
import "./FamousPlaces.css";

function FamousPlaces() {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  if (loading) return <p className="loading-text">Loading famous places...</p>;

  if (!cities || cities.length === 0)
    return <p className="loading-text">No famous places found.</p>;

  return (
    <div className="famous-places-container">
      <div className="famous-places-header">
        <h2>Famous Places Around You</h2>
        <p className="famous-places-subtitle">
          Explore the most iconic and breathtaking places in each city. Discover culture, history, and beauty all in one place.
        </p>
        <hr className="famous-places-separator" />
      </div>
      <div className="famous-places-grid">
        {cities.map((city) => (
          <Link
            key={city.id}
            to={`/famous-places/${city.id}`}
            className="city-card"
          >
            {city.image ? (
              <img
                src={city.image}
                alt={city.name}
                className="city-card-image"
              />
            ) : (
              <div className="city-card-placeholder">No Image</div>
            )}
            <h3 className="city-card-name">{city.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FamousPlaces;
