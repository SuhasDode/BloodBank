import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adddonation.css'; // Import the CSS file
import Navbar from '../Navbar';

function AddDonation() {
  const [donation, setDonation] = useState({ donor_id: '', blood_group: '', volume: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        alert('You must be logged in as staff to register donors.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/staff/add-donation',
        donation,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.message);
      alert('Donation recorded successfully');
      navigate('/staff-dashboard');
    } catch (error) {
      console.error('Error registering donation:', error);
      alert(error.response?.data?.message || 'Failed to register donation');
    }
  };

  return ( 
  <div><div><Navbar name = 'Staff DashBoard' route='staff-dashboard'/></div>
    <div className="donation-container">
      <h2 className="donation-title">Record a Blood Donation</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        <input type="text" name="donor_id" placeholder="Donor ID" onChange={handleChange} required />
        <input type="text" name="blood_group" placeholder="Blood Group" onChange={handleChange} required />
        <input type="number" name="volume" placeholder="Volume (ml)" onChange={handleChange} required />
        <button type="submit" className="submit-btn">Record Donation</button>
      </form>
    </div></div>
  );
}

export default AddDonation;
