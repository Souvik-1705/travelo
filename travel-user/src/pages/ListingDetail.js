import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../redux/slices/listingSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import BookingModal from "../components/BookingModal";

function ListingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);
  const { categories } = useSelector((state) => state.category);
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchListings());
    }
    if (categories.length === 0) {
    dispatch(fetchCategories());
  }
  }, [dispatch, listings.length,categories.length]);

  useEffect(() => {
    const found = listings.find((l) => l.id === id);
    if (found) setListing(found);
  }, [listings, id]);

  if (!listing) return <p style={{ padding: "1rem" }}>Loading listing...</p>;
  const category = categories.find((c) => c.id === listing.categoryId);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{listing.placeName}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {listing.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            style={{ width: "200px", borderRadius: "6px" }}
          />
        ))}
      </div>
      <p><strong>Price:</strong> ₹{listing.pricePerNight} / night</p>
      <p><strong>Address:</strong> {listing.address}, {listing.city} - {listing.pin}</p>
      <p><strong>Category:</strong> {category?.name}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Availability:</strong> {listing.availability ? "Available" : "Not available"}</p>

      {listing.availability && (
        <button style={{ marginTop: "1rem" }} onClick={() => setShowModal(true)}>
          Book Now
        </button>
      )}

      {showModal && (
        <BookingModal
          listing={listing}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ListingDetail;
