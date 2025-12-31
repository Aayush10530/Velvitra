const express = require('express');
const router = express.Router();
const { createCustomTourRequest } = require('../controllers/customTourController');

router.post('/', createCustomTourRequest);

module.exports = router; 