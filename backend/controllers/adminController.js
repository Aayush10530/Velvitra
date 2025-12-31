const User = require('../models/User');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

// Get dashboard stats (example)
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const tourCount = await Tour.countDocuments({});
    const bookingCount = await Booking.countDocuments({});

    res.json({
      success: true,
      data: {
        userCount,
        tourCount,
        bookingCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get all bookings is already in bookingController, but we can add an admin-specific one here if needed
// const getAllBookings = async (req, res) => { ... };

module.exports = {
  getDashboardStats,
  getAllUsers,
  // getAllBookings
}; 