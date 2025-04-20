import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import image from '../../public/assets/images/Selection (2).png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow rounded-3 py-3 position-relative">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center text-success fw-bold fs-4" to="/">
          <img
            src={image}
            alt="Logo"
            style={{ width: '110px', height: 'auto', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 800, letterSpacing: '0.5px' }}>
            Saarthi.<span className="text-dark">AI</span>
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="d-flex align-items-center rounded-3">
          <NavLink className="nav-link me-3 fw-bold text-dark" to="/">Home</NavLink>
          <NavLink className="nav-link me-3 fw-bold text-dark" to="/aboutus">About</NavLink>
          <NavLink className="nav-link me-3 fw-bold text-dark" to="/helpus">Help</NavLink>

          {!user ? (
            <>
              <NavLink className="nav-link me-3 fw-bold text-dark" to="/signin">Login</NavLink>
              <NavLink to="/signup" className="btn btn-outline-success fw-bold me-4">Sign Up</NavLink>
            </>
          ) : (
            <>
              <div
                onClick={toggleDropdown}
                className="profile-icon bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: '36px', height: '36px', cursor: 'pointer' }}
              >
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
            </>
          )}
        </div>

        {/* Dropdown (when logged in) */}
        {user && (
          <div
            ref={dropdownRef}
            className={`custom-dropdown position-absolute end-0 mt-2 ${dropdownOpen ? 'd-block' : 'd-none'}`}
            style={{
              top: '70px',
              right: '20px',
              width: '280px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              zIndex: 999
            }}
          >
            <div className="dropdown-header d-flex align-items-center px-3 py-2 border-bottom">
              <img
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt="User"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px' }}
              />
              <div className="info">
                <strong>{user.name}</strong><br />
                <small>{user.email}</small>
              </div>
            </div>
            <NavLink to="/account" className="dropdown-item px-3 py-2"><i className="bi bi-person-circle me-2"></i> Account</NavLink>
            <NavLink to="/trip" className="dropdown-item px-3 py-2"><i className="bi bi-map me-2"></i> Plan My Trip</NavLink>
            <div className="switch-container d-flex justify-content-between align-items-center px-3 py-2">
              <span><i className="bi bi-moon me-2"></i> Night mode</span>
              <div className="form-check form-switch m-0">
                <input className="form-check-input" type="checkbox" id="nightSwitch" />
              </div>
            </div>
            <NavLink to="/history" className="dropdown-item px-3 py-2"><i className="bi bi-clock-history me-2"></i> History</NavLink>
            <NavLink to="/badges" className="dropdown-item px-3 py-2"><i className="bi bi-award me-2"></i> Badges</NavLink>
            <NavLink to="/sustainability" className="dropdown-item px-3 py-2"><i className="bi bi-leaf me-2"></i> Sustainability Score</NavLink>
            <hr className="m-0" />
            <button onClick={handleLogout} className="dropdown-item text-danger px-3 py-2"><i className="bi bi-box-arrow-right me-2"></i> Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
