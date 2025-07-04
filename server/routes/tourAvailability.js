const express = require('express');
const router = express.Router();
const { getTourAvailability, setTourAvailability } = require('../controllers/tourAvailabilityController');
const { auth, adminAuth } = require('../middleware/auth');

// @route   GET /api/availability/:tourId
// @desc    Get availability for a specific tour
// @access  Public
router.get('/:tourId', getTourAvailability);

// @route   POST /api/availability
// @desc    Set availability for a tour (admin only)
// @access  Private/Admin
router.post('/', auth, adminAuth, setTourAvailability);

module.exports = router; 