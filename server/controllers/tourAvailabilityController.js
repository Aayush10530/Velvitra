const TourAvailability = require('../models/TourAvailability');
const mongoose = require('mongoose');

/**
 * Get availability for a specific tour within a given month.
 * Expects tourId in params, and year/month in query string.
 * Example: /api/availability/60d21b4667d0d8992e610c85?year=2025&month=6
 */
const getTourAvailability = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: 'Year and month query parameters are required.',
      });
    }

    // Validate tourId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ success: false, message: 'Invalid Tour ID.' });
    }

    // Calculate start and end dates for the given month
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0));

    const availability = await TourAvailability.find({
      tour: tourId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select('date status');

    // Format data for easier use on the frontend
    const availabilityMap = availability.reduce((acc, item) => {
      // Format date to YYYY-MM-DD
      const dateString = item.date.toISOString().split('T')[0];
      acc[dateString] = item.status;
      return acc;
    }, {});

    res.json({
      success: true,
      data: availabilityMap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour availability.',
      error: error.message,
    });
  }
};

/**
 * Create or update the availability for a specific tour on a given date.
 * This is intended for admin use.
 */
const setTourAvailability = async (req, res) => {
  try {
    const { tourId, date, status, slotsAvailable } = req.body;

    // Validate tourId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ success: false, message: 'Invalid Tour ID.' });
    }

    const availabilityData = {
      tour: tourId,
      date: new Date(date),
      status,
      slotsAvailable,
    };

    // Use findOneAndUpdate with upsert to create a new entry if one doesn't exist
    // for the specified tour and date, or update it if it does.
    const updatedAvailability = await TourAvailability.findOneAndUpdate(
      { tour: tourId, date: new Date(date) },
      availabilityData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: 'Tour availability updated successfully.',
      data: updatedAvailability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update tour availability.',
      error: error.message,
    });
  }
};

module.exports = {
  getTourAvailability,
  setTourAvailability,
}; 