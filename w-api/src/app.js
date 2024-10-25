const express = require('express');
const cors = require('cors'); // Import cors
const cron = require('./config/cron');
require('dotenv').config();
const { fetchAndStoreWeatherData } = require('./jobs/weather.job');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const routes = require('./routes');

fetchAndStoreWeatherData();
cron.startWeatherJob();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/weather', routes.weather);
app.use('/summary', routes.summary);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
