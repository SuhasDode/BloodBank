 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import './Admin1.css'

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch donors from the backend
  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/donors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonors(res.data);
    } catch (err) {
      console.error('Error fetching donors:', err);
      setError('Failed to fetch donors.');
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchDonors();
  }, []);

  if (loading) return <p className="text-center">Loading donors...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <Navbar name = 'Blood Bank Admin' route='admin-dashboard'/>
      <h2 className="title">👥 View Donors</h2> 
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Blood Group</th>
                <th className="py-2 px-4 border-b text-left">Last Donation Date</th> 
              </tr>
            </thead>
            <tbody>
              {donors.length > 0? ( donors.map((donor) => (
                <tr key={donor.donor_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{donor.donor_id}</td>
                  <td className="py-2 px-4 border-b">{donor.name}</td>
                  <td className="py-2 px-4 border-b">{donor.blood_group}</td>
                  <td className="py-2 px-4 border-b">{donor.last_donation_date || 'N/A'}</td> 
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5">No Donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default ManageDonors;
