const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Tour description is required']
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: String,
    required: [true, 'Tour duration is required']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Maximum group size is required'],
    min: [1, 'Group size must be at least 1']
  },
  images: [{
    type: String,
    required: [true, 'Tour image is required']
  }],
  highlights: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  included: [{
    type: String
  }],
  excluded: [{
    type: String
  }],
  location: {
    type: String,
    required: [true, 'Tour location is required']
  },
  category: {
    type: String,
    required: [true, 'Tour category is required'],
    enum: ['day-tour', 'multi-day', 'special-access', 'cultural', 'photography']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average rating
tourSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / this.reviews.length;
});

// Create slug from title
tourSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  next();
});

// Index for search
tourSchema.index({ title: 'text', description: 'text', location: 'text' });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour; 