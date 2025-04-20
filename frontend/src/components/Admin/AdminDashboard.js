import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaUsers, FaTachometerAlt, FaSignOutAlt, FaHandHoldingHeart, FaDatabase } from 'react-icons/fa';
import './AdminDashboard.css';
import Footer from '../Footer';
import StatsSection from '../StatsSection'
function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard1">
      <header className="dashboard-header1">
        <h1><FaTachometerAlt /> Admin Dashboard</h1>
        <div><button className="history-btn" onClick={() => navigate('/history')}>History</button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button></div>
      </header>

      <div className="dashboard-content1">
        <div className="dashboard-card1" onClick={() => navigate('/manage-users')}>
          <FaUserCog size={50} />
          <h3>Manage Users</h3>
          <p>View, edit and delete user accounts.</p>
        </div>

        <div className="dashboard-card1" onClick={() => navigate('/manage-donors')}>
          <FaHandHoldingHeart size={50} />
          <h3>View Donors</h3>
          <p>Monitor donor registrations and donations.</p>
        </div>
      </div>
      <div className="dashboard-content1">
        <div className="dashboard-card1" onClick={() => navigate('/manage-stock')}>
          <FaDatabase size={50} />
          <h3> Blood Stock</h3>
          <p>Track available blood stock.</p>
        </div>

        <div className="dashboard-card1" onClick={() => navigate('/view-requests')}>
          <FaUsers size={50} />
          <h3>Recipient Requests</h3>
          <p>Review and approve recipient requests.</p>
        </div>
      </div>
      <section>
        <div>
        <StatsSection />
      </div>
      </section>
      < Footer />
    </div> 
  );
}

export default AdminDashboard;
