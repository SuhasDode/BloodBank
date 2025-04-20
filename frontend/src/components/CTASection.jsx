import React from 'react';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <h2>Ready to Save Lives?</h2>
      <p>Become a donor today and make a difference!</p>
      <a href="/register" className="btn-primary">Register Now</a>
    </section>
  );
};

export default CTASection;
