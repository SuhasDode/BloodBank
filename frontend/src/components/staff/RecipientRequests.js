import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "./RecipientRequests.css";

function RecipientRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. User may not be logged in.");
      return;
    }

    axios
      .get("http://localhost:5000/api/staff/recipient-requests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, [token]);

  const handleUpdate = async (request_id, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/staff/update-request",
        { request_id, status, staff_id: 1 }, // Replace 1 with logged-in staff's ID
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Request ${status} successfully!`);
      setRequests(requests.map(req => req.recipient_id === request_id ? { ...req, status } : req));
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      // Display error in an alert
      alert(`Error: ${errorMessage}`);
      console.error("Error updating request:", error);
    }
  };

  if (loading) return <p>Loading recipient requests...</p>;

  return (
    <div className="recipient-container">
      <Navbar name="Staff Dashboard" route="staff-dashboard" />
      <h2 className="recipient-title">Recipient Requests</h2>
      
      <div className="recipient-table-container">
        <table className="recipient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Hospital</th>
              <th>Units</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={`request-${req.recipient_id}`}>
                  <td>{req.name}</td>
                  <td>{req.blood_group}</td>
                  <td>{req.hospital}</td>
                  <td>{req.volume_required} ml</td>
                  <td>{req.purpose}</td>
                  <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
                  <td>
                    {req.status === "Pending" && (
                      <>
                        <button className="approve-btn" onClick={() => handleUpdate(req.recipient_id, "Approved")}>Approve</button>
                        <button className="reject-btn" onClick={() => handleUpdate(req.recipient_id, "Rejected")}>Reject</button>
                      </>
                    )}
                    {req.status === "Approved" && (
                      <button className="complete-btn" onClick={() => handleUpdate(req.recipient_id, "Completed")}>Complete</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="no-data">No recipient requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipientRequests;
