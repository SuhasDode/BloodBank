import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin1.css';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/donations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(res.data);
    };
    fetchDonations();
  }, []);

  return (
    <div className="donations-container">
      <h2>Monitor Donations</h2>
      <table>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Date</th>
            <th>Blood Type</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.donorName}</td>
              <td>{donation.date}</td>
              <td>{donation.bloodType}</td>
              <td>{donation.volume} ml</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonations;
