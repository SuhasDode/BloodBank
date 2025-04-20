import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHistory.css"; // Import the CSS file
import Navbar from "../Navbar";

function AdminHistory() {
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory(filter);
  }, [filter]);

  const fetchHistory = async (filter) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/admin/history?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data.requests);
      setDonations(res.data.donations);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Search Filter Function
  const filterData = (data) => {
    return data.filter(
      (record) =>
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.blood_group.toLowerCase().includes(search.toLowerCase()) ||
        record.status.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="history-container">
        <Navbar name='Blood bank Admin' route='admin-dashboard'/>
      <h2>Transaction & Donation History</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("15")}>Last 15 Days</button>
        <button onClick={() => setFilter("30")}>Last 30 Days</button>
        <button onClick={() => setFilter("all")}>All</button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, blood group, status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Requests Table */}
      <h3>Blood Requests</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Volume</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filterData(requests).length === 0 ? (
              <tr>
                <td colSpan="6">No records found.</td>
              </tr>
            ) : (
              filterData(requests).map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.blood_group}</td>
                  <td>{record.volume} ml</td>
                  <td>{record.status}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Donations Table */}
      <h3>Blood Donations</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Volume</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filterData(donations).length === 0 ? (
              <tr>
                <td colSpan="5">No records found.</td>
              </tr>
            ) : (
              filterData(donations).map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.blood_group}</td>
                  <td>{record.volume} ml</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHistory;
