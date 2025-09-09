import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingModal.css";
import { useSelector } from "react-redux";

function BookingModal({ listing, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [address, setAddress] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.auth.email);

  const handleBooking = async () => {
    const days = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) return alert("Invalid date range");

    const totalPrice = days * listing.pricePerNight;

    const booking = {
      listingId: listing.id,
      userId: email,
      userName: name,
      phone,
      email,
      fromDate,
      toDate,
      days,
      guests,
      totalPrice,
      address,
      status: "pending",
    };

    try {
      setLoading(true);
      await axios.post(
        `https://travel-website-2ae60-default-rtdb.firebaseio.com/bookings.json`,
        booking
      );
      setBookingStatus("success");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className.includes("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box">
  <button className="close-btn" onClick={onClose}>&times;</button>
  <h2 className="modal-title">Book {listing.placeName}</h2>

  <div className="modal-content">
    {/* ALL form fields here */}
    <div className="form-group">
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
    </div>

    <div className="form-group">
      <label>Phone Number</label>
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
    </div>

    <div className="form-group">
      <label>Check-in Date</label>
      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Check-out Date</label>
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
    </div>

    <div className="form-group">
      <label>No. of Guests</label>
      <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" />
    </div>

    <div className="form-group">
      <label>Your Address</label>
      <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
    </div>

    <button className="confirm-btn" onClick={handleBooking} disabled={loading}>
      {loading ? "Booking..." : "Confirm Booking"}
    </button>

    {bookingStatus === "success" && <p className="status-msg success">Booking placed! Await approval.</p>}
    {bookingStatus === "error" && <p className="status-msg error">Booking failed. Please try again.</p>}
  </div>
</div>

    </div>
  );
}

export default BookingModal;
