import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterDonor.css'; // Import the CSS file
import Navbar from '../Navbar';

function RegisterDonor() {
  const [donor, setDonor] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    blood_group: 'A+',
    contact_number: '',
    address: '',
    medical_history: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
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
        'http://localhost:5000/api/staff/register-donor',
        donor,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.message);
      alert('Donor registered successfully');
      navigate('/staff-dashboard');
    } catch (error) {
      console.error('Error registering donor:', error);
      alert(error.response?.data?.message || 'Failed to register donor');
    }
  };
  

  return (
    <div><div><Navbar name = 'Staff DashBoard' route='staff-dashboard'/></div>
    <div className="register-container">
      
      <h2 className="register-title">🩸 Register New Donor</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        
        <select name="gender" onChange={handleChange} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="blood_group" onChange={handleChange} required>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input type="text" name="contact_number" placeholder="Contact Number" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <textarea name="medical_history" placeholder="Medical History (if any)" onChange={handleChange} />

        <button type="submit" className="register-btn">Register Donor</button>
      </form>
    </div></div>
  );
}

export default RegisterDonor;
