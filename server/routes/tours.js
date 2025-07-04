const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourCategories,
  getFeaturedTours
} = require('../controllers/tourController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', getAllTours);
router.get('/categories', getTourCategories);
router.get('/featured', getFeaturedTours);
router.get('/:slug', getTour);

// Protected routes (admin only)
router.post('/', auth, adminAuth, createTour);
router.put('/:id', auth, adminAuth, updateTour);
router.delete('/:id', auth, adminAuth, deleteTour);

module.exports = router; 