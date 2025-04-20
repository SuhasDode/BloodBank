import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin1.css';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/recipient-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/recipient-requests/${id}`, 
      { status: action },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(`Request ${action}`);
  };

  return (
    <div className="requests-container">
      <h2>Recipient Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Blood Type</th>
            <th>Units</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.recipientName}</td>
              <td>{req.bloodType}</td>
              <td>{req.unitsRequested}</td>
              <td>{req.status}</td>
              <td>
                {req.status === 'Pending' && (
                  <>
                    <button onClick={() => handleAction(req.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleAction(req.id, 'Rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
