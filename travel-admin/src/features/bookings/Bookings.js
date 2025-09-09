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
          <div className="table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Place</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td data-label="User">{b.userName}</td>
                    <td data-label="Place">{getPlaceName(b.listingId)}</td>
                    <td data-label="From">{b.fromDate}</td>
                    <td data-label="To">{b.toDate}</td>
                    <td data-label="Days">{b.days}</td>
                    <td data-label="Total">₹{b.totalPrice}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => handleApprove(b.id)} className="btn approve">Approve</button>
                          <button onClick={() => handleReject(b.id)} className="btn reject">Reject</button>
                        </>
                      )}
                      <button onClick={() => handleDelete(b.id)} className="btn delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;

