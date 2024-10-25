const weatherRoute = require('./weather.route');
const summaryRoute = require('./summary.route');

module.exports = {
    weather: weatherRoute,
    summary: summaryRoute,
};