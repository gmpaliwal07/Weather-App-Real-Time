const express = require('express');

const weatherController = require('../controllers/weather.controller');

const router = express.Router();

router.get('/', weatherController.getWeather);

module.exports = router;