import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, fetchListings } from "../../redux/slices/listingSlice";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/Listings.css";

function Listings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, loading } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteListing(id));
  };

  return (
    <>
    <AdminNavbar/>
    <div>
      <h2>All Listings</h2>
      {loading ? <p>Loading...</p> : listings.map((l) => (
  <div key={l.id} className="listing-card">
    <div className="listing-content">
      <div className="listing-info">
        <h3>{l.placeName} — ₹{l.pricePerNight}/night</h3>
        <p>{l.city}, PIN: {l.pin}</p>
        <p>{l.description}</p>
        <p>Status: {l.availability ? "Available" : "Not Available"}</p>
        <button onClick={() => navigate(`/admin/edit-listing/${l.id}`)}>Edit</button>
        <button onClick={() => handleDelete(l.id)}>Delete</button>
      </div>
      {l.images?.length > 0 && (
        <div className="listing-image">
          <img src={l.images[0]} alt="Listing" />
        </div>
      )}
    </div>
  </div>
))}

    </div>
    </>
  );
}

export default Listings;
