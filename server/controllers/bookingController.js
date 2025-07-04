const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const RoomAvailability = require('../models/RoomAvailability');
const { sendEmail, emailTemplates } = require('../utils/email');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { tourId, bookingDate, numberOfPeople, specialRequests, hotelBooking } = req.body;
    const userId = req.user._id;

    // Check if tour exists and is active
    const tour = await Tour.findOne({ _id: tourId, isActive: true });
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found or not available'
      });
    }

    // If hotel booking is included, check room availability
    if (hotelBooking) {
      const { hotelId, roomId, checkIn, checkOut } = hotelBooking;
      
      // Check room availability
      const dates = [];
      let currentDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const existingAvailability = await RoomAvailability.find({
        hotelId,
        roomId,
        date: { $in: dates },
        isAvailable: false
      });

      if (existingAvailability.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Selected room is not available for the chosen dates',
          unavailableDates: existingAvailability.map(room => room.date)
        });
      }
    }

    // Create booking
    const booking = new Booking({
      tour: tourId,
      user: userId,
      bookingDate,
      numberOfPeople,
      specialRequests,
      hotelBooking
    });

    await booking.save();

    // If hotel booking is included, reserve the room
    if (hotelBooking) {
      const { hotelId, roomId, checkIn, checkOut } = hotelBooking;
      
      // Create availability records for each date
      const availabilityPromises = dates.map(date => 
        RoomAvailability.findOneAndUpdate(
          { hotelId, roomId, date },
          { isAvailable: false, bookingId: booking._id },
          { upsert: true, new: true }
        )
      );

      await Promise.all(availabilityPromises);
    }

    // Populate tour and user details for email
    await booking.populate([
      { path: 'tour', select: 'title' },
      { path: 'user', select: 'name email' }
    ]);

    // Send confirmation email
    const { subject, message } = emailTemplates.bookingConfirmation(booking);
    await sendEmail({
      email: booking.user.email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('tour')
      .sort('-createdAt');

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Get single booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tour')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only admin can update status
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update booking status'
      });
    }

    booking.status = status;
    await booking.save();

    // Send status update email
    await sendEmail({
      email: booking.user.email,
      subject: 'Booking Status Update',
      message: `
        <h1>Booking Status Update</h1>
        <p>Your booking status has been updated to: ${status}</p>
        <p>Booking ID: ${booking._id}</p>
      `
    });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to cancel this booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Cancel booking
    await booking.cancelBooking(reason);

    // Send cancellation email
    await sendEmail({
      email: booking.user.email,
      subject: 'Booking Cancellation',
      message: `
        <h1>Booking Cancelled</h1>
        <p>Your booking has been cancelled.</p>
        <p>Reason: ${reason}</p>
        <p>Refund Amount: $${booking.refundAmount}</p>
      `
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('tour')
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  getAllBookings
}; 