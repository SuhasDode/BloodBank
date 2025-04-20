import React, { useState } from 'react';
import axios from 'axios';
import { FaTint } from 'react-icons/fa'; // blood drop icon
import './BloodRequest.css';

function BloodRequest() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    blood_group: '',
    volume_required: '',
    hospital: '',
    purpose: '', 
    contact_number: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/user/request-blood', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Blood request submitted successfully!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        blood_group: '',
        volume_required: '',
        hospital: '',
        purpose: '', 
        contact_number: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
      alert('❌ Failed to submit request');
    }
  };

  return (
    <div className="request-container">
      <div className="form-card">
        <h2><FaTint className="icon" /> Request Blood</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Units Required (ml)</label>
            <input
              type="number"
              name="volume_required"
              min="1"
              value={formData.units}
              onChange={handleChange}
              placeholder="Enter units (ml)"
              required
            />
          </div>

          <div className="form-group">
            <label>Hospital</label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
            />
          </div>

          <div className="form-group">
            <label>Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Explain the purpose"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div> 

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default BloodRequest;
