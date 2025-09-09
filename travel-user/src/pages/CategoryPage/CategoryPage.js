import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchListings } from "../../redux/slices/listingSlice"; 
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import "./CategoryPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

function CategoryPage() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const { listings } = useSelector((state) => state.listing);

  const [filteredListings, setFilteredListings] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    if (listings.length === 0) dispatch(fetchListings());
  }, [dispatch, categories.length, listings.length]);

  // ✅ Receives results + active flag from SearchBar
  const handleSearch = (results, isActive) => {
    setFilteredListings(results);
    setSearchActive(isActive);
  };

  if (loading) return <p className="loading">Loading categories...</p>;

  return (
    <div className="category-page">
      <h1 className="category-page-title">All Categories</h1>
      <p className="category-page-subtitle">
        Browse through our wide range of categories to find your perfect stay.
      </p>

      <SearchBar onSearch={handleSearch} />

      {searchActive ? (
        filteredListings.length > 0 ? (
          <div className="listings-grid">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <Link to={`/listing/${listing.id}`} className="listing-link">
                <img
                  src={listing.images?.[0]}
                  alt={listing.placeName}
                  className="listing-img"
                />
                <h3>{listing.placeName}</h3>
                <p>{listing.address}</p>
                <p className="price">₹{listing.pricePerNight}/night</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: "1rem" }}>No results found.</p>
        )
      ) : (
        <CategorySlider categories={categories} />
      )}
    </div>
  );
}

export default CategoryPage;
