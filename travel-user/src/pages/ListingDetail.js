import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../redux/slices/listingSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import BookingModal from "../components/BookingModal";
import "../styles/ListingDetail.css";

function ListingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);
  const { categories } = useSelector((state) => state.category);
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (listings.length === 0) dispatch(fetchListings());
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, listings.length, categories.length]);

  useEffect(() => {
    const found = listings.find((l) => l.id === id);
    if (found) setListing(found);
  }, [listings, id]);

  if (!listing) return <p className="loading-text">Loading listing...</p>;

  const category = categories.find((c) => c.id === listing.categoryId);

  return (
    <div className="listing-detail-container">
      <h1 className="listing-title">{listing.placeName}</h1>
      <div className="listing-category-price">
        <span className="listing-category">{category?.name}</span>
        <span className="listing-price">₹{listing.pricePerNight} / night</span>
      </div>

      {/* Image Gallery */}
      <div className="listing-images">
        {listing.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            className="listing-image"
          />
        ))}
      </div>

      {/* Listing Details */}
      <div className="listing-info">
        <p><strong>Address:</strong> {listing.address}, {listing.city} - {listing.pin}</p>
        <p><strong>Description:</strong> {listing.description}</p>
        <p><strong>Availability:</strong> {listing.availability ? "Available" : "Not available"}</p>
      </div>

      {/* Book Button */}
      {listing.availability && (
        <button className="book-button" onClick={() => setShowModal(true)}>
          Book Now
        </button>
      )}

      {showModal && <BookingModal listing={listing} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ListingDetail;
