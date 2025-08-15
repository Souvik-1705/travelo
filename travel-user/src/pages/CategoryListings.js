import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../redux/slices/listingSlice";
import "../styles/Listings.css";

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
    <div style={{ padding: "1rem" }}>
      <h2>Listings in this Category</h2>

      <div style={{ margin: "1rem 0" }}>
        <label>Filter by max price: </label>
        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
          <option value="">All</option>
          <option value="1000">₹1000</option>
          <option value="2000">₹2000</option>
          <option value="3000">₹3000</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="listing-grid">
          {filtered.map((listing) => (
            <div key={listing.id} className="listing-card">
              <img
                src={listing.images?.[0]}
                alt={listing.placeName}
                style={{ width: "200px", borderRadius: "8px", height:"auto"}}
              />
              <h4>{listing.placeName}</h4>
              <p>₹{listing.pricePerNight} / night</p>
              <button onClick={() => navigate(`/listing/${listing.id}`)}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryListings;
