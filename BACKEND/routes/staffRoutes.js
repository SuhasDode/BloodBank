const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware'); // For authentication

// Register a new donor
router.post('/register-donor', authMiddleware, staffController.registerDonor);

// Record a new donation
router.post('/add-donation', authMiddleware, staffController.addDonation);

// View blood stock
router.get('/view-stock', authMiddleware, staffController.viewStock);

// Get all recipient requests
router.get('/recipient-requests', authMiddleware, staffController.getRecipientRequests);

// Approve or reject recipient request
router.post('/update-request', authMiddleware, staffController.updateRequest);

module.exports = router;
