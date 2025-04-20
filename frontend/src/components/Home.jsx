import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Home.css';
// import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
// import CTASection from './CTASection';
import TestimonialsSection from './TestimonialsSection';
// import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out!");
    localStorage.removeItem('token'); // or clear context/auth
    navigate('/login');
  };
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Blood Bank Management System</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li> 
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Donate Blood, Save Lives</h2>
        <p>Your blood can give someone another chance at life.</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">Become a Donor</Link>
          <Link to="/donors" className="btn-secondary">Find a Donor</Link>
        </div>
      </section>

      {/* Information Cards */}
      <section className="info-section">
        <div className="info-card">
          <h3>Why Donate?</h3>
          <p>Donating blood saves lives. Every drop counts in emergencies and surgeries.</p>
        </div>
        <div className="info-card">
          <h3>Who Can Donate?</h3>
          <p>Healthy individuals aged 18-65, weighing over 50 kg, and meeting basic health requirements.</p>
        </div>
        <div className="info-card">
          <h3>How It Works</h3>
          <p>Register, get notified of donation camps, and help those in need with your donation.</p>
        </div>
      </section>

      <section>
        <div>
        <FeaturesSection />
      </div>
      </section>
      <section>
        <div>
        <AboutSection />
      </div>
      </section>
      <section>
        <div>
        <StatsSection />
      </div>
      </section>
      <section>
        <div>
        <TestimonialsSection />
      </div>
      </section>
      {/* <section>
        <div>
        <CTASection />
      </div>
      </section> */}
      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 Blood Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
