const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Tour reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  numberOfPeople: {
    adults: {
      type: Number,
      required: [true, 'Number of adults is required'],
      min: [1, 'At least one adult is required']
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'Number of children cannot be negative']
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    paymentId: String,
    paymentMethod: String,
    paymentDate: Date,
    transactionId: String
  },
  hotelBooking: {
    hotelId: String,
    roomId: String,
    checkIn: Date,
    checkOut: Date,
    roomPrice: Number,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  },
  specialRequests: {
    type: String,
    trim: true
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total amount before saving
bookingSchema.pre('save', async function(next) {
  if (!this.isModified('numberOfPeople') && !this.isModified('hotelBooking')) return next();
  
  try {
    const tour = await mongoose.model('Tour').findById(this.tour);
    if (!tour) {
      throw new Error('Tour not found');
    }
    
    // Calculate tour amount (adults pay full price, children pay 50%)
    const tourAmount = (tour.price * this.numberOfPeople.adults) + 
                      (tour.price * 0.5 * this.numberOfPeople.children);
    
    // Add hotel amount if hotel booking exists
    const hotelAmount = this.hotelBooking?.roomPrice || 0;
    
    this.totalAmount = tourAmount + hotelAmount;
    
    next();
  } catch (error) {
    next(error);
  }
});

// Release hotel room when booking is cancelled
bookingSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update?.status === 'cancelled' && this._conditions.hotelBooking) {
    try {
      const booking = await this.model.findOne(this._conditions);
      if (booking?.hotelBooking) {
        const { hotelId, roomId, checkIn, checkOut } = booking.hotelBooking;
        await mongoose.model('RoomAvailability').updateMany(
          {
            hotelId,
            roomId,
            date: {
              $gte: checkIn,
              $lte: checkOut
            }
          },
          { isAvailable: true, bookingId: null }
        );
      }
    } catch (error) {
      console.error('Error releasing hotel room:', error);
    }
  }
  
  next();
});

// Method to cancel booking
bookingSchema.methods.cancelBooking = async function(reason) {
  this.status = 'cancelled';
  this.cancellationReason = reason;
  
  // Calculate refund amount based on cancellation policy
  const bookingDate = new Date(this.bookingDate);
  const now = new Date();
  const hoursUntilBooking = (bookingDate - now) / (1000 * 60 * 60);
  
  if (hoursUntilBooking > 24) {
    // Full refund if cancelled more than 24 hours before
    this.refundAmount = this.totalAmount;
  } else if (hoursUntilBooking > 12) {
    // 50% refund if cancelled between 12-24 hours before
    this.refundAmount = this.totalAmount * 0.5;
  } else {
    // No refund if cancelled less than 12 hours before
    this.refundAmount = 0;
  }
  
  return this.save();
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 