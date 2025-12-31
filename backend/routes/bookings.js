const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

// Protected routes
router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.get('/:id', auth, getBooking);
router.post('/:id/cancel', auth, cancelBooking);

// Admin routes
router.get('/', auth, adminAuth, getAllBookings);
router.patch('/:id/status', auth, adminAuth, updateBookingStatus);

module.exports = router; 