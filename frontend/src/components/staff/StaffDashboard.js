import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaTint, FaBoxes, FaList, FaSignOutAlt } from 'react-icons/fa';
import './staffDashboard.css';
import Footer from '../Footer';
import StatsSection from '../StatsSection';

function StaffDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <h1><FaTint /> Staff Dashboard</h1>
        <div><button className="donor-btn" onClick={()=>navigate('/view-donor')} >View Donors</button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button></div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card" onClick={() => navigate('/register-donor')}>
          <FaUserPlus size={50} style={{ color: 'red' }}/>
          <h3>Register Donor</h3>
          <p>Add new donors to the system.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/add-donation')}>
          <FaTint size={50} style={{ color: 'red' }}/>
          <h3>Record Donation</h3>
          <p>Log a new blood donation.</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card" onClick={() => navigate('/view-stock')}>
          <FaBoxes size={50} style={{ color: 'red' }}/>
          <h3>Blood Stock</h3>
          <p>Monitor available blood units.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/recipient-requests')}>
          <FaList size={50} style={{ color: 'red' }}/>
          <h3>Recipient Requests</h3>
          <p>Manage and fulfill recipient requests.</p>
        </div>
      </div>

      <section>
        <div>
          <StatsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default StaffDashboard;
