import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    { title: "Register as Donor", desc: "Join our community and become a life saver.", icon: "🩸" },
    { title: "Find Blood", desc: "Easily request blood or search for available donors.", icon: "🔎" },
    { title: "Organize Camps", desc: "Host blood donation drives in your locality.", icon: "🏥" },
  ];

  return (
    <section className="features-section">
      <h2>Our Services</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
