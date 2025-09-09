import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../redux/slices/listingSlice";
import "../styles/CategoryListings.css";

function CategoryListings() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, loading } = useSelector((state) => state.listing);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const filtered = listings.filter(
    (l) =>
      l.categoryId === id &&
      l.availability === true &&
      (!priceFilter || l.pricePerNight <= parseInt(priceFilter))
  );

  return (
    <div className="category-listings-container">
      <h1 className="category-listings-title">Available Listings</h1>
      <p className="category-listings-subtitle">
        Browse all available listings in this category and choose your perfect stay.
      </p>

      <div className="filter-section">
        <label htmlFor="priceFilter">Filter by max price:</label>
        <select
          id="priceFilter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="1000">₹1000</option>
          <option value="2000">₹2000</option>
          <option value="3000">₹3000</option>
          <option value="4000">₹4000</option>
          <option value="5000">₹5000</option>
          <option value="6000">₹6000</option>
          <option value="7000">₹7000</option>
          <option value="8000">₹8000</option>
          <option value="9000">₹9000</option>
          <option value="10000">₹10000</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Loading listings...</p>
      ) : filtered.length === 0 ? (
        <p className="no-listings-text">No listings found for this category.</p>
      ) : (
        <div className="listing-grid">
          {filtered.map((listing) => (
            <div key={listing.id} className="listing-card">
              <img
                src={listing.images?.[0]}
                alt={listing.placeName}
                className="listing-image"
              />
              <div className="listing-details">
                <h3 className="listing-name">{listing.placeName}</h3>
                <p className="listing-price">₹{listing.pricePerNight} / night</p>
                <button
                  className="listing-button"
                  onClick={() => navigate(`/listing/${listing.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryListings;
