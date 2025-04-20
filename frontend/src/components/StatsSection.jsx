import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    { number: "10,000+", label: "Donors Registered" },
    { number: "5,000+", label: "Units of Blood Donated" },
    { number: "800+", label: "Successful Transfusions" },
  ];

  return (
    <section className="stats-section">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <h3>{stat.number}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
