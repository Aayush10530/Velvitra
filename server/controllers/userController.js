const User = require('../models/User');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // User is already attached to req by the auth middleware
    res.json({
      success: true,
      data: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'phone', 'address'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ success: false, message: 'Invalid updates!' });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Delete user (can be added later if needed)
// const deleteUser = async (req, res) => { ... };

module.exports = {
  getUserProfile,
  updateUserProfile
}; 