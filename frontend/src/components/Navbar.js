import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  // Blood Bank Admin
  return (
    <nav className="admin-navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        🩸 {props.name}
      </div>
      {/* <ul className="navbar-links">
        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/manage-users')}>Users</li>
        <li onClick={() => navigate('/manage-donors')}>Donors</li>
        <li onClick={() => navigate('/manage-stock')}>Stock</li>
        <li onClick={() => navigate('/view-requests')}>Requests</li>
      </ul> */ }
      <div><button className="Home-btn" onClick={()=>navigate(`/${props.route}`)}><FaHome className="icon-home" /> Home</button>
      <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt className="icon-logout" />Logout</button></div>
    </nav>
  );
}

export default Navbar;
