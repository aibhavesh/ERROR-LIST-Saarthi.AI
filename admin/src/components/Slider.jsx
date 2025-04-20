import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '220px' }}>
      <h4 className="text-success">Admin Panel</h4>
      <NavLink to="/admin/dashboard" className="d-block text-white mt-3">Dashboard</NavLink>
      <NavLink to="/admin/users" className="d-block text-white mt-2">Users</NavLink>
    </div>
  );
};

export default Sidebar;
