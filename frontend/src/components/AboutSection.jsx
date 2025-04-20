import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Our Blood Bank</h2>
        <p>We are dedicated to ensuring a steady and safe supply of blood to those in need. Our mission is to promote voluntary blood donation and save lives through timely support and advanced technology.</p>
        <a href="/about" className="btn-primary">Learn More</a>
      </div>
      <div className="about-image">
        <img src="/images/about-blood.jpg" alt="About Us" />
      </div>
    </section>
  );
};

export default AboutSection;
