const Weather = require('../models/weather.model');
const weatherService = require('../services/openweather.service');

const fetchAndStoreWeatherData = async () => {
    try {
        const weatherData = await weatherService.getWeatherData();

        weatherData.forEach(async data => {
            let kelvin = data.main.temp;
            let celsius = kelvin - 273.15;

            if (celsius > 35) {
                console.log('Temperature is too high in ' + data.name + ' with ' + celsius + '°C');
            }

            const weather = new Weather({
                city: data.name,
                datetime: new Date(data.dt * 1000),
                main: data.weather[0].main,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                low_temp  : data.main.temp_min,
                high_temp : data.main.temp_max,
                pressure : data.main.pressure,
                humidity : data.main.humidity,
                visibility : data.visibility,
                wind_speed : data.wind.speed,
                sunrise : data.sys.sunrise,
                sunset : data.sys.sunset
            });

            await weather.save();
           
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

module.exports = {
    fetchAndStoreWeatherData,
};