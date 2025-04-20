const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Authenticated user routes
router.post('/request-blood', auth, userController.sendBloodRequest);
router.get('/donation-history', auth, userController.getDonationHistory);
router.get('/my-requests', auth, userController.getMyRequests);
router.put('/update-profile', auth, userController.updateProfile);
router.get('/profile',auth,userController.profile);

module.exports = router;
