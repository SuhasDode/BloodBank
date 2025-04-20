import React, { useState, useEffect } from "react";
import { FaTint, FaUsers, FaFileAlt } from "react-icons/fa";
import axios from "axios";
import "./AdminStatistics.css"; // Ensure CSS is correctly linked

function AdminStatistics() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalUnits: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/statistics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const generateReport = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/admin/report", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReport(res.data.report);
      alert("Report generated successfully!");
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Error generating report.");
    }
  };

  if (loading) return <p>Loading statistics...</p>;

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Statistics Overview</h2>

      <div className="stats-cards">
        <div className="card">
          <FaUsers className="icon users-icon" />
          <h3>Total Donors</h3>
          <p>{stats.totalDonors}</p>
        </div>

        <div className="card">
          <FaTint className="icon blood-icon" />
          <h3>Blood Units</h3>
          <p>{stats.totalUnits} ml</p>
        </div>

        <div className="card">
          <FaFileAlt className="icon requests-icon" />
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
      </div>

      <button className="report-btn" onClick={generateReport}>
        Generate Report
      </button>

      {report && (
        <div className="report-section">
          <h3>Generated Report</h3>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AdminStatistics;
