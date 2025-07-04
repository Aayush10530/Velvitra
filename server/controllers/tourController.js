const Tour = require('../models/Tour');

// Get all tours
const getAllTours = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search,
      minPrice,
      maxPrice,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Execute query
    const tours = await Tour.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reviews');

    // Get total count
    const count = await Tour.countDocuments(query);

    res.json({
      success: true,
      data: tours,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tours',
      error: error.message
    });
  }
};

// Get single tour
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug })
      .populate('reviews');

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour',
      error: error.message
    });
  }
};

// Create tour
const createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create tour',
      error: error.message
    });
  }
};

// Update tour
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour updated successfully',
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update tour',
      error: error.message
    });
  }
};

// Delete tour
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete tour',
      error: error.message
    });
  }
};

// Get tour categories
const getTourCategories = async (req, res) => {
  try {
    const categories = await Tour.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// Get featured tours
const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ isActive: true })
      .sort('-rating')
      .limit(6)
      .populate('reviews');

    res.json({
      success: true,
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured tours',
      error: error.message
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourCategories,
  getFeaturedTours
}; 