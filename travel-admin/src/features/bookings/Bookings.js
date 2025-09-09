import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus, deleteBooking } from "../../redux/slices/bookingSlice";
import { fetchListings } from "../../redux/slices/listingSlice";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/Bookings.css";

function Bookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const { listings } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchListings());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(updateBookingStatus({ id, status: "completed" }));
  };

  const handleReject = (id) => {
    dispatch(updateBookingStatus({ id, status: "Rejected" }));
  };

  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
  };

  const getPlaceName = (listingId) => {
    const found = listings.find((l) => l.id === listingId);
    return found ? found.placeName : "Unknown";
  };

  const getStatusClass = (status) => {
    if (status === "pending") return "status-pending";
    if (status === "completed") return "status-completed";
    if (status === "Rejected") return "status-rejected";
    return "";
  };

  return (
    <>
      <AdminNavbar />
      <div className="bookings-container">
        <h2>Manage Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-grid">
            {bookings.map((b) => (
              <div key={b.id} className="booking-card">
                <p><strong>User:</strong> {b.userName}</p>
                <p><strong>Place:</strong> {getPlaceName(b.listingId)}</p>
                <p><strong>From:</strong> {b.fromDate} <strong>To:</strong> {b.toDate}</p>
                <p><strong>Days:</strong> {b.days} <strong>Total:</strong> ₹{b.totalPrice}</p>
                <p className={`booking-status ${getStatusClass(b.status)}`}>
                  {b.status === "pending" ? "🟡 Pending" : b.status === "completed" ? "✅ Completed" : "❌ Rejected"}
                </p>
                <div className="booking-actions">
                  {b.status === "pending" && (
                    <>
                      <button onClick={() => handleApprove(b.id)} className="approve-btn">Approve</button>
                      <button onClick={() => handleReject(b.id)} className="reject-btn">Reject</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(b.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;

