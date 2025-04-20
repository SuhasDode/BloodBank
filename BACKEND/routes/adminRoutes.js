const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/add-staff/:id',adminController.AddStaff);
// Manage Users
router.get('/users', adminController.getAllUsers);
router.delete('/users/:userId', adminController.deleteUser);

// Manage Donors
router.get('/donors', adminController.getAllDonors);

// Manage Blood Stock
router.get('/blood-stock', adminController.getBloodStock);
router.put('/blood-stock', adminController.updateBloodStock);

// Manage Recipient Requests
router.get('/recipient-requests', adminController.getRecipientRequests);
router.put('/recipient-requests/:recipientId/approve', adminController.approveRecipientRequest);
router.put('/recipient-requests/:recipientId/reject', adminController.rejectRecipientRequest);

// Monitor Donations
router.get('/donations', adminController.getDonations);

// Statistics Overview
router.get('/statistics', adminController.getStatistics);

// Generate Report
router.post('/report', adminController.generateReport);
router.get('/history',adminController.getHistory);
router.get('/bloodstock/expiring',adminController.GetExpiry);
module.exports = router;
