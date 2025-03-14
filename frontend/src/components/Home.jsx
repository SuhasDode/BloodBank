import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
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
            <li><Link to="/donors">Find Donor</Link></li>
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

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 Blood Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
