const axios = require('axios');

// Example service to fetch weather data from an external API
const getWeatherData = async () => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error('OpenWeather API key is missing');
    }

    const cities = ["New Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=:city&appid=${apiKey}`;

    try {
        const weatherData = await Promise.all(cities.map(async city => {
            const response = await axios.get(apiUrl.replace(':city', city));
            return response.data;
        }));

        return weatherData;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
};

module.exports = {
    getWeatherData,
};
