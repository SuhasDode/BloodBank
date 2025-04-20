import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Donate Blood, Save Lives</h1>
        <p>Your donation can give someone another chance at life.</p>
        <a href="/register" className="btn-primary">Become a Donor</a>
      </div>
    </section>
  );
};

export default HeroSection;
