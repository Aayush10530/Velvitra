const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true
  },
  images: [{
    type: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure one review per user per tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Update tour rating when review is created/updated/deleted
reviewSchema.post('save', async function() {
  await this.constructor.calculateAverageRating(this.tour);
});

reviewSchema.post('remove', async function() {
  await this.constructor.calculateAverageRating(this.tour);
});

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      rating: stats[0].averageRating
    });
  } else {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      rating: 0
    });
  }
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 