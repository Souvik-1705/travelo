import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../../redux/slices/bookingSlice";
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
  const handleReject=(id)=>{
    dispatch(updateBookingStatus({id,status:"Rejected"}));
  }

  const getPlaceName = (listingId) => {
    const found = listings.find((l) => l.id === listingId);
    return found ? found.placeName : "Unknown";
  };

  return (
    <>
    <AdminNavbar/>
    <div style={{ padding: "1rem" }}>
      <h2>Manage Bookings</h2>
      {loading ? <p>Loading...</p> : bookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }} className="booking-card">
          <p><strong>User:</strong> {b.userName}</p>
          <p><strong>Place:</strong> {getPlaceName(b.listingId)}</p>
          <p><strong>From:</strong> {b.fromDate} <strong>To:</strong> {b.toDate}</p>
          <p><strong>Days:</strong> {b.days} <strong>Total:</strong> ₹{b.totalPrice}</p>
          <p><strong>Status:</strong> {b.status}</p>
          {b.status === "pending" && (
        <div>
          <button onClick={() => handleApprove(b.id)} className="approve-btn">Approve</button>
          <button onClick={() => handleReject(b.id)} className="reject-btn">Reject</button>
        </div>
        )}
        </div>
      ))}
    </div>
    </>
  );
}

export default Bookings;
