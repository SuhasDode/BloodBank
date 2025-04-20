import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BloodStock.css"; // Add CSS for styling

function BloodStock() {
  const [expiringStock, setExpiringStock] = useState([]);

  useEffect(() => {
    fetchExpiringStock();
  }, []);

  const fetchExpiringStock = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/bloodstock/expiring", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpiringStock(res.data);
    } catch (error) {
      console.error("Error fetching expiring blood stock:", error);
    }
  };

  return (
    <div className="bloodstock-container">
      <h2>Blood Stock Management</h2>

      {/* Expiring Blood Stock */}
      <h3 className="alert-heading">⚠️ Expiring Soon</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Group</th>
              <th>Volume (ml)</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {expiringStock.length === 0 ? (
              <tr>
                <td colSpan="4">No blood stock nearing expiry.</td>
              </tr>
            ) : (
              expiringStock.map((stock) => (
                <tr key={stock.id} className="expiring-row">
                  <td>{stock.id}</td>
                  <td>{stock.blood_group}</td>
                  <td>{stock.volume}</td>
                  <td className="expiry-date">{new Date(stock.expiry_date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodStock;
