// src/pages/account/MyAccount.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MyAccount = () => {
  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-center">My Account</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <NavLink to="history" className="btn btn-outline-success">
          Search History
        </NavLink>
        <NavLink to="settings" className="btn btn-outline-secondary">
          Account Settings
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MyAccount;
