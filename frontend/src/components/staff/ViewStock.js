import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTint } from 'react-icons/fa';
import './Viewstock.css';
import Navbar from '../Navbar';

function ViewStock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
    
  const fetchStock = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/staff/view-stock", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(res.data);
    } catch (error) {
      console.error("Error fetching blood stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  if (loading) return <p>Loading blood stock...</p>;
  return (
    <div className="stock-container">

      <Navbar name = 'Staff DashBoard' route='staff-dashboard'/>
      <h2 className="stock-title"><FaTint /> Blood Stock Available</h2>
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Available Units (ml)</th>
            </tr>
          </thead>
          <tbody>
            {stock.length > 0 ? (
              stock.map((item) => (
                <tr key={item.blood_group}>
                  <td>{item.blood_group}</td>
                  <td>{item.total_volume}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">No blood stock available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStock;
