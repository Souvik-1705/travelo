import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" className="logo-text">TravelStay</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/category">Categories</Link>
        <Link to="/history">History</Link>
      </nav>

      <div className="header-actions">
        {email ? (
          <div className="profile-container">
            <div className="avatar" onClick={toggleDropdown}>
              {email.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-email">{email}</p>
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
