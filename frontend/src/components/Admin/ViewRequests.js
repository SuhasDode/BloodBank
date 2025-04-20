import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/recipient-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/recipient-requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading recipient requests...</p>;

  return (
    <div>
      <Navbar name = 'Blood Bank Admin' route='admin-dashboard' />
      <h2>Recipient Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Blood Group</th><th>Volume</th><th>Purpose</th><th>Address</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.recipient_id}>
              <td>{request.recipient_id}</td><td>{request.name}</td><td>{request.blood_group}</td><td>{request.volume_required}</td><td>{request.purpose}</td><td>{request.address}</td><td>{request.status}</td>
              <td>
                <button onClick={() => updateStatus(request.recipient_id, 'Approved')}>Approve</button>
                <button onClick={() => updateStatus(request.recipient_id, 'Rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRequests;
