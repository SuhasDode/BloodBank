import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // assuming you store role in localStorage after login

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  // If roles are provided, check if user's role matches
  if (roles && !roles.includes(userRole)) {
    // Redirect to unauthorized or homepage
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
