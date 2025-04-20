import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaTint, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import './Userdashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [donationCount, setDonationCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserName(data.name);
        setDonationCount(data.total_donations || 0);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRequestCount = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/user/my-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requests = await res.json();
        setRequestCount(requests.length);
      } catch (err) {
        console.error('Request fetch error:', err);
      }
    };

    fetchUserData();
    fetchRequestCount();
  }, []);

  return (
    <div className="dashboard-container2">
      <header className="dashboard-header2">
        <h1>Hello, <span>{userName || 'User'}</span>!</h1>
        <p>You are a life saver! <FaHeart className="heart-icon" /></p>
        <div className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />Logout 
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-card">
          <FaTint className="card-icon red-icon" />
          <h3>Total Donations</h3>
          <p>{donationCount}</p>
        </div>

        <div className="stats-card" onClick={() => navigate("/my-requests")}>
          <FaHistory className="card-icon blue-icon" />
          <h3>Blood Requests Made</h3>
          <p>{requestCount}</p>
        </div>
      </section>

      {/* <div className="dashboard-buttons">
        <button onClick={() => navigate('/donation-history')}>
          <FaHistory /> My Donations
        </button>

        <button onClick={() => navigate('/request-blood')}>
          <FaTint /> Request Blood
        </button>

        <button onClick={() => navigate('/profile')}>
          <FaUser /> Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div> */}
      <div className="dashboard-actions">
        <div className="action-card" onClick={() => navigate('/donation-history')}>
          <FaHistory className="action-icon" />
          <h3>My Donations</h3>
          <p>View your past donation records and impact.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/request-blood')}>
          <FaTint className="action-icon" />
          <h3>Request Blood</h3>
          <p>Need blood urgently? Make a new request here.</p>
        </div>

        <div className="action-card" onClick={() => navigate('/profile')}>
          <FaUser className="action-icon" />
          <h3>My Profile</h3>
          <p>View and update your profile information.</p>
        </div>

        
      </div>

    </div>
  );
}

export default UserDashboard;
