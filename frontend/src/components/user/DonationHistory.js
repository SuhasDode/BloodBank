  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import './DonationHistory.css';
import Navbar from '../Navbar';

  function DonationHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true); 
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/donation-history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data); 
      } catch (error) {
        console.error(error); 
        // alert('You are not registered as a donor.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchHistory();
    }, []);

    if (loading) return <p>Loading donation history...</p>;

    return (
      <div className="history-container">
        <Navbar name='user' route='user-dashboard'/>
        <h2>Donation History</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th><th>Date</th><th>Volumes (in ml)</th>
            </tr>
          </thead>
          {history.length === 0 ? (
          <p>No donation history found.</p>
          ) : (<> </>)}
          <tbody>
            {history.map((donation, index) => (
              <tr key={donation.donation_id}>
                <td>{index + 1}</td>
                <td>{new Date(donation.donation_date).toLocaleDateString('en-US', { 
                  weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' 
                })}</td>
                <td>{donation.volume}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default DonationHistory;
