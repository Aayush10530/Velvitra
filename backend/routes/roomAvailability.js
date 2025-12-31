const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  checkRoomAvailability,
  reserveRoom,
  releaseRoom
} = require('../controllers/roomAvailabilityController');

// Check room availability
router.post('/check', auth, checkRoomAvailability);

// Reserve a room
router.post('/reserve', auth, reserveRoom);

// Release room reservation
router.post('/release', auth, releaseRoom);

module.exports = router; 