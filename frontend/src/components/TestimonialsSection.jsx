import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Anjali S.", feedback: "Donating blood was so simple. I feel great knowing I saved a life!" },
    { name: "Rohit K.", feedback: "The process was smooth and safe. Highly recommend others to donate!" },
  ];

  return (
    <section className="testimonials-section">
      <h2>What Our Donors Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testi, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{testi.feedback}"</p>
            <h4>- {testi.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
