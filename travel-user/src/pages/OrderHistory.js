import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../redux/slices/bookingSlice";
import { fetchListings } from "../redux/slices/listingSlice";

function OrderHistory() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const { listings } = useSelector((state) => state.listing);
  const { email } = useSelector((state) => state.auth); // get current user's email

  useEffect(() => {
    dispatch(fetchBookings());
    if (listings.length === 0) {
      dispatch(fetchListings());
    }
  }, [dispatch, listings.length]);

  if (!email) return <p style={{ padding: "1rem" }}>Please log in to view your bookings.</p>;

  const userBookings = bookings.filter((b) => b.userId === email);

  const getListing = (id) => listings.find((l) => l.id === id);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🧾 Your Booking History</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        userBookings.map((b) => {
          const listing = getListing(b.listingId);
          return (
            <div
              key={b.id}
              style={{
                border: "1px solid #ccc",
                margin: "1rem 0",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h4>{listing?.placeName || "Listing Deleted"}</h4>
              {listing?.images?.[0] && (
                <img
                  src={listing.images[0]}
                  alt="Listing"
                  style={{ width: "200px", borderRadius: "6px" }}
                />
              )}
              <p>📆 {b.fromDate} → {b.toDate} ({b.days} days)</p>
              <p>👥 {b.guests} guests</p>
              <p>📍 {b.address}</p>
              <p>💰 ₹{b.totalPrice}</p>
              <p>Status: <strong>{b.status}</strong></p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrderHistory;
