const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

// Admin routes - protected by adminAuth middleware
router.get('/dashboard-stats', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getAllUsers);
// Add other admin routes here as needed (e.g., manage tours, manage bookings)

module.exports = router; 