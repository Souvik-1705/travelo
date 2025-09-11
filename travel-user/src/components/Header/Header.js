import React, { useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef(null);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" className="logo-text" onClick={handleNavClick}>TravelStay</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={handleNavClick}>Home</Link>
        <Link to="/category" onClick={handleNavClick}>Categories</Link>
        <Link to="/famous-places" onClick={handleNavClick}>Famous Places</Link>
        <Link to="/history" onClick={handleNavClick}>History</Link>
      </nav>

      <div className="header-actions">
        {email ? (
          <div className="profile-container"  ref={dropdownRef}>
            <div className="avatar" onClick={toggleDropdown}>
              {email.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-email">{email}</p>
                <Link to="/profile" onClick={()=>setDropdownOpen(false)}>Profile</Link>
                <Link to="/settings" onClick={()=>setDropdownOpen(false)}>Settings</Link>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-link" onClick={handleNavClick}>Login</Link>
            <Link to="/signup" className="auth-link" onClick={handleNavClick}>Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
