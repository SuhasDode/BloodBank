import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin1.css';

const AdminBloodStock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/blood-stock', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(res.data);
    };
    fetchStock();
  }, []);
 

  return (
    <div className="bloodstock-container">
      <h2 className="title">👥 Blood Stock</h2> 
      <table>
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.blood_group}>
              <td>{item.blood_group}</td>
              <td>{item.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBloodStock;
