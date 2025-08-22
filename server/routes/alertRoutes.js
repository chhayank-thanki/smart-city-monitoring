const express = require('express');
const router = express.Router();
const { getAlerts } = require('../controllers/alertController');

// Define your route
router.get('/alerts', getAlerts);

module.exports = router;
