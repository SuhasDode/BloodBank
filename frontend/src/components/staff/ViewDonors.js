import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Admin/Admin1.css';
import Navbar from '../Navbar';

function ViewDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/donors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  if (loading) return <p>Loading donors...</p>;

  // Filter donors by search term (name or blood group)
  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.blood_group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ( 
    <div className="manage-donors-container">
      <Navbar name='Staff' route='staff-dashboard'/>
      <h2 className="title">🩸 View Donors</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or blood group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="donors-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Blood Group</th><th>Contact</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map(donor => (
              <tr key={donor.id}>
                <td>{donor.donor_id}</td>
                <td>{donor.name}</td>
                <td>{donor.blood_group}</td>
                <td>{donor.contact_number}</td>
                <td>{donor.address || "not found"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No donors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewDonor;
