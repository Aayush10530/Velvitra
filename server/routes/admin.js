const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');
const { setTourAvailability, getTourAvailability } = require('../controllers/tourAvailabilityController');

// Admin routes - protected by adminAuth middleware
router.get('/dashboard-stats', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getAllUsers);

// @route   POST /api/admin/availability
// @desc    Set availability for a tour (admin only)
// @access  Private/Admin
router.post('/availability', adminAuth, setTourAvailability);

// @route   GET /api/admin/availability/:tourId
// @desc    Get availability for a specific tour (admin only)
// @access  Private/Admin
router.get('/availability/:tourId', adminAuth, getTourAvailability);

// Add other admin routes here as needed (e.g., manage tours, manage bookings)

module.exports = router; 