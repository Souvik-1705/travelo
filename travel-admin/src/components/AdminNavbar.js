import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux/slices/authSlice";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <h2>🏝️ Travel Admin</h2>
      </div>
      <div className="admin-navbar-center">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/listings">Listings</Link>
        <Link to="/admin/add-listing">Add Listing</Link>
        <Link to="/admin/bookings">Bookings</Link>
      </div>
      <div className="admin-navbar-right">
        <span>{email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
