import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // import the CSS file

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message); 
      
      // ✅ Save token to localStorage
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log('Token saved:', res.data.token);
      } else {
        console.warn('No token received in response');
      }
  
      // ✅ Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (res.data.role === 'staff') {
        navigate('/staff-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? 'btn disabled' : 'btn'}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="register-link">
          Don't have an account?{' '}
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;


