import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Cinema Platform</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
