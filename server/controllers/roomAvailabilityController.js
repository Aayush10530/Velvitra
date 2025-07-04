const RoomAvailability = require('../models/RoomAvailability');
const Booking = require('../models/Booking');

// Check room availability for a date range
const checkRoomAvailability = async (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut } = req.body;

    // Get all dates between check-in and check-out
    const dates = [];
    let currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Check availability for each date
    const availability = await RoomAvailability.find({
      hotelId,
      roomId,
      date: { $in: dates }
    });

    // If any date is not available, return false
    const isAvailable = availability.every(room => room.isAvailable);

    res.json({
      success: true,
      isAvailable,
      unavailableDates: availability
        .filter(room => !room.isAvailable)
        .map(room => room.date)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check room availability',
      error: error.message
    });
  }
};

// Reserve a room for a date range
const reserveRoom = async (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut, bookingId } = req.body;

    // Get all dates between check-in and check-out
    const dates = [];
    let currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Check if room is available for all dates
    const existingAvailability = await RoomAvailability.find({
      hotelId,
      roomId,
      date: { $in: dates },
      isAvailable: false
    });

    if (existingAvailability.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for the selected dates',
        unavailableDates: existingAvailability.map(room => room.date)
      });
    }

    // Create or update availability records
    const availabilityPromises = dates.map(date => 
      RoomAvailability.findOneAndUpdate(
        { hotelId, roomId, date },
        { isAvailable: false, bookingId },
        { upsert: true, new: true }
      )
    );

    await Promise.all(availabilityPromises);

    res.json({
      success: true,
      message: 'Room reserved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reserve room',
      error: error.message
    });
  }
};

// Release room reservation
const releaseRoom = async (req, res) => {
  try {
    const { hotelId, roomId, checkIn, checkOut } = req.body;

    // Get all dates between check-in and check-out
    const dates = [];
    let currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update availability records
    await RoomAvailability.updateMany(
      { hotelId, roomId, date: { $in: dates } },
      { isAvailable: true, bookingId: null }
    );

    res.json({
      success: true,
      message: 'Room reservation released successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to release room reservation',
      error: error.message
    });
  }
};

module.exports = {
  checkRoomAvailability,
  reserveRoom,
  releaseRoom
}; 