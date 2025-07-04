const mongoose = require('mongoose');

const roomAvailabilitySchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: [true, 'Hotel ID is required']
  },
  roomId: {
    type: String,
    required: [true, 'Room ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  }
}, {
  timestamps: true
});

// Compound index to ensure unique room availability per date
roomAvailabilitySchema.index({ hotelId: 1, roomId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('RoomAvailability', roomAvailabilitySchema); 