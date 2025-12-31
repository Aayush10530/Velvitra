const mongoose = require('mongoose');

const tourAvailabilitySchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['available', 'limited', 'booked'],
    default: 'available',
    required: true
  },
  slotsAvailable: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Create a compound index to ensure that there's only one availability
// entry per tour per day. This prevents duplicate data.
tourAvailabilitySchema.index({ tour: 1, date: 1 }, { unique: true });

const TourAvailability = mongoose.model('TourAvailability', tourAvailabilitySchema);

module.exports = TourAvailability; 