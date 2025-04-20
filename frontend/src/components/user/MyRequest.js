import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Navbar';

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [token]);

  const filteredRequests = requests.filter(
    (req) =>
      req.blood_group.toLowerCase().includes(search.toLowerCase()) ||
      req.status.toLowerCase().includes(search.toLowerCase()) ||
      req.hospital.toLowerCase().includes(search.toLowerCase()) ||
      req.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar name='User' route='user-dashboard' />
      <h2>My Blood Requests</h2>
      
      <input
        type="text"
        placeholder="Search requests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Blood Group</th>
            <th>Hospital</th>
            <th>Units</th>
            <th>Purpose</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <tr key={req.request_id}>
                <td>{new Date(req.request_date).toLocaleString()}</td>
                <td>{req.blood_group}</td>
                <td>{req.hospital}</td>
                <td>{req.volume_required} ml</td>
                <td>{req.purpose}</td>
                <td>{req.status}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No requests found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyRequests;
