import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, cancelBooking } from "../redux/slices/bookingSlice"; // <-- add cancelBooking
import { fetchListings } from "../redux/slices/listingSlice";
import "../styles/OrderHistory.css";

function OrderHistory() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const { listings } = useSelector((state) => state.listing);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBookings());
    if (listings.length === 0) {
      dispatch(fetchListings());
    }
  }, [dispatch, listings.length]);

  if (!email) return <p className="history-msg">⚠️ Please log in to view your bookings.</p>;

  const userBookings = bookings.filter((b) => b.userId === email);

  const getListing = (id) => listings.find((l) => l.id === id);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(id)); // <-- dispatch cancel
    }
  };

  return (
    <div className="history-container">
      <h2 className="history-title">🧾 Your Booking History</h2>

      {loading ? (
        <p className="history-msg">Loading bookings...</p>
      ) : userBookings.length === 0 ? (
        <p className="history-msg">No bookings found.</p>
      ) : (
        <div className="history-grid">
          {userBookings.map((b) => {
            const listing = getListing(b.listingId);
            return (
              <div key={b.id} className="history-card">
                {listing?.images?.[0] && (
                  <img
                    src={listing.images[0]}
                    alt="Listing"
                    className="history-img"
                  />
                )}
                <div className="history-details">
                  <h3>{listing?.placeName || "Listing Deleted"}</h3>
                  <p>📆 {b.fromDate} → {b.toDate} ({b.days} days)</p>
                  <p>👥 {b.guests} guests</p>
                  <p>📍 {b.address}</p>
                  <p>💰 ₹{b.totalPrice}</p>
                  <p>Status: <span className={`status ${b.status}`}>{b.status}</span></p>

                  {/* Cancel button only if booking is still pending */}
                  {b.status === "pending" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(b.id)}
                    >
                      ❌ Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
