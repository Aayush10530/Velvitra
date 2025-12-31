const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logout
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.post('/logout', logout);

module.exports = router; 