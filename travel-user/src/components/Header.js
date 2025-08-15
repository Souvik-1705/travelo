import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "../styles/HeaderFooter.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <span>TravelStay</span>
        </Link>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search your dream place..." />
      </div>

      <div className="header-icons">
        <Link to="/history" title="Booking History">🧾</Link>

        {email ? (
          <>
            <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>{email}</span>
            <button
              onClick={logoutHandler}
              style={{
                marginLeft: "1rem",
                padding: "6px 10px",
                border: "none",
                backgroundColor: "#e53935",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: "1rem" }}>Login</Link>
            <Link to="/signup" style={{ marginLeft: "1rem" }}>Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
