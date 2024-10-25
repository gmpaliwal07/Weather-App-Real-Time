const cron = require('node-cron');
const weatherJob = require('../jobs/weather.job');

const startWeatherJob = () => {
    cron.schedule('*/5 * * * *', () => {
        weatherJob.fetchAndStoreWeatherData();
    });
};

module.exports = {
    startWeatherJob,
};