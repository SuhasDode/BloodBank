import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public components
import Register from './components/Register';
import VerifyOtp from './components/VerifyOtp';
import Login from './components/Login';
import Home from './components/Home';

// Dashboards
import AdminDashboard from './components/Admin/AdminDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import UserDashboard from './components/user/UserDashboard';

// Admin features
import ManageDonors from './components/Admin/ManageDonors';
import ManageUsers from './components/Admin/ManageUsers';
import ManageStock from './components/Admin/ManageStock';
import ViewRequests from './components/Admin/ViewRequests';
import AdminBloodStock from './components/Admin/AdminBloodStock';
import AdminRequests from './components/Admin/AdminRequests';
import AdminStatistics from './components/Admin/AdminStatistics';
import AdminDonations from './components/Admin/AdminDonations';
import AdminHistory from './components/Admin/AdminHistory';
import BloodStock from './components/Admin/BloodStock';

import BloodRequest from './components/user/BloodRequest';
import DonationHistory from './components/user/DonationHistory';
import UserProfile from './components/user/UserProfile';
// import PrivateRoute from './components/PrivateRoute'; // optional for auth
import RegisterDonor from './components/staff/RegisterDonor';
import AddDonation from './components/staff/AddDonation';
import ViewStock from './components/staff/ViewStock';
import RecipientRequests from './components/staff/RecipientRequests';
import ViewDonor from './components/staff/ViewDonors';

import MyRequests from './components/user/MyRequest';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp/:userId" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-donors" element={<ManageDonors />} />
        <Route path="/manage-stock" element={<ManageStock />} />
        <Route path='/history' element={<AdminHistory/>}/>
        <Route path='/expiry' element={<BloodStock/>}/>
        {/* Requests and Reports */}
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/admin-blood-stock" element={<AdminBloodStock />} />
        <Route path="/admin-statistics" element={<AdminStatistics />} />
        <Route path="/admin-donations" element={<AdminDonations />} />
        <Route path="/admin-requests" element={<AdminRequests />} />

        <Route path="request-blood" element={<BloodRequest />} />
        <Route path="donation-history" element={<DonationHistory />} />
        <Route path="profile" element={<UserProfile />} />


        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/view-stock" element={<ViewStock />} />
        <Route path="/recipient-requests" element={<RecipientRequests />} />
        <Route path='/view-donor' element={<ViewDonor/>}/>
        <Route path='/my-requests' element={<MyRequests/>}/>
        {/* 404 Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
  