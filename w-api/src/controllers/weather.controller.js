const Weather = require("../models/weather.model");

const getWeather = async (req, res) => {
    try {
        const city = req.query.city;

        const weather = await Weather.find({ city: city })
            .sort({ datetime: -1 })
            .limit(1);
            
        res.json({
            weather: weather[0] || null
        });
    } catch (error) {
        res.json({ message: error });
    }
};

module.exports = {
    getWeather,
};