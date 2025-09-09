import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, fetchListings } from "../../redux/slices/listingSlice";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/Listings.css";
import { useNavigate } from "react-router-dom";

function Listings() {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);
  const navigate=useNavigate();
  
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteListing(id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="listings-container">
        <h2 className="listings-heading">All Listings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div className="listings-grid">
            {listings.map((l) => (
              <a
                key={l.id}
                href={l.googleLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="listing-card"
              >
                {l.images?.length > 0 && (
                  <div className="listing-image">
                    <img src={l.images[0]} alt="Listing" />
                    <span className="price-tag">₹{l.pricePerNight}/night</span>
                  </div>
                )}
                <div className="listing-info">
                  <h3 className="listing-title">{l.placeName}</h3>
                  <p className="listing-location">{l.city}, PIN: {l.pin}</p>
                  <p className="listing-description">{l.description}</p>

                  <div className="listing-bottom">
                    <p className={`listing-status ${l.availability ? "available" : "unavailable"}`}>
                      {l.availability ? "✅ Available" : "❌ Not Available"}
                    </p>
                    <div className="listing-actions">
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/admin/edit-listing/${l.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(l.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>


              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Listings;
