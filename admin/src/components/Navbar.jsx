import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <span className="navbar-brand mb-0 h1 text-success">Saarthi Admin</span>
      {localStorage.getItem('adminToken') && (
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
