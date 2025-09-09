import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux/slices/authSlice";
import { markAllRead } from "../redux/slices/bookingSlice";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const { unreadCount, bookings } = useSelector((state) => state.booking);

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
    dispatch(markAllRead());
  };

  return (
    <nav className="admin-navbar">
      
      <div className="admin-navbar-left">
        <h2>Travelo</h2>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      <div className={`admin-navbar-center ${menuOpen ? "active" : ""}`}>
        <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/admin/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/admin/listings" onClick={() => setMenuOpen(false)}>Listings</Link>
        <Link to="/admin/add-listing" onClick={() => setMenuOpen(false)}>Add Listing</Link>
        <Link to="/admin/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link>
      </div>

      
      <div className="admin-navbar-right">
        <div className="notification-wrapper" ref={dropdownRef}>
          <div className="notification-bell" onClick={handleNotificationClick}>
            <FaBell size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </div>

          {showDropdown && (
            <div className="notification-dropdown">
              {bookings.filter((b) => b.status === "pending").length > 0 ? (
                bookings
                  .filter((b) => b.status === "pending")
                  .map((b) => (
                    <p
                      key={b.id}
                      className="notif-item"
                      onClick={() => navigate("/admin/bookings")}
                    >
                      📌 {b.name || "User"} booking is pending
                    </p>
                  ))
              ) : (
                <p className="notif-empty">No pending bookings</p>
              )}
            </div>
          )}
        </div>
        <span className="admin-email">{email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
