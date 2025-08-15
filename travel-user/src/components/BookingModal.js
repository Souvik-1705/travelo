import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingModal.css";
import { useSelector } from "react-redux";

function BookingModal({ listing, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [address, setAddress] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const email=useSelector(state=>state.auth.email);
  
  const handleBooking = async () => {
    const days = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) return alert("Invalid date range");

    const totalPrice = days * listing.pricePerNight;

    const booking = {
      listingId: listing.id,
      userId: email, 
      userName: email.split("@")[0],
      fromDate,
      toDate,
      days,
      guests,
      totalPrice,
      address,
      status: "pending",
    };

    try {
      await axios.post(
        `https://travel-website-7-default-rtdb.firebaseio.com/bookings.json`,
        booking
      );
      setBookingStatus("success");
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Book {listing.placeName}</h3>
        <label>Check-in Date:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label>Check-out Date:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <label>No. of Guests:</label>
        <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" />
        <label>Your Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handleBooking}>Confirm Booking</button>
        <button onClick={onClose}>Close</button>

        {bookingStatus === "success" && <p style={{ color: "green" }}>Booking placed! Await approval.</p>}
        {bookingStatus === "error" && <p style={{ color: "red" }}>Booking failed. Try again.</p>}
      </div>
    </div>
  );
}

export default BookingModal;
