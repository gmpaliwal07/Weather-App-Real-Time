import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import loadingAnimation from '../lotties/loading.json';
import Cloudy from '../lotties/Cloudy.json'; 
import Rainy from '../lotties/Rainy.json'; 
import Sunny from '../lotties/Sunny.json'; 
import Wind from '../lotties/wind-day.json'; 
import Thunderstorm from '../lotties/thunderstorm.json';
import sunriseImage from '/assets/sunrise.svg'; 
import sunsetImage from '/assets/sunset.svg'; 
import humidityIcon from '/assets/humidity.svg'
import visibilityIcon from '/assets/visiblity.svg'
import pressureIcon from '/assets/pressure.svg'
import windIcon from '/assets/wind.svg'

const getGradientBackground = (condition) => {
    const gradients = {
        'sunny': 'from-gray-500 via-gray-600 to-gray-700',
        'rain': 'from-gray-600 via-gray-700 to-gray-800',
        'cloudy': 'from-gray-500 via-gray-600 to-gray-700',
        'windy': 'from-gray-600 via-gray-700 to-gray-800',
        'thunderstorm': 'from-gray-700 via-gray-800 to-gray-900',
        'default': 'from-gray-600 via-gray-700 to-gray-800'
    };
    return gradients[condition.toLowerCase()] || gradients['default'];
};

const getAnimationData = (condition) => {
    const animations = {
        'sunny': Sunny,
        'rain': Rainy,
        'cloudy': Cloudy,
        'windy': Wind,
        'thunderstorm': Thunderstorm
    };
    return animations[condition.toLowerCase()] || Cloudy;
};

const WeatherSummary = ({ city }) => {
    const [weatherData, setWeatherData] = React.useState({
        tempMin: null,
        main: '',
        humidity: null,
        wind: null,
        visibility: null,
        pressure: null,
        sunrise: '',
        sunset: '',
    });
    const [loading, setLoading] = React.useState(true);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
            const data = response.data.weather;

            setWeatherData({
                tempMin: (data.low_temp - 273.15).toFixed(1),
                main: data.main,
                humidity: data.humidity,
                wind: data.wind_speed.toFixed(1),
                visibility: (data.visibility / 1000).toFixed(1),
                pressure: data.pressure,
                sunrise: new Date(data.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sunset: new Date(data.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchWeatherData();
    }, [city]);

    const animationData = getAnimationData(weatherData.main);
    const gradientBg = getGradientBackground(weatherData.main);
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice', 
        },
    };

    if (loading) {
        return (
            <div className="flex  items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800">
                <Lottie options={{
                    ...defaultOptions,
                    animationData: loadingAnimation
                }} height={300} width={300}/>
            </div>
        );
    }

    return (
        <div className={`bg-gradient-to-br ${gradientBg} text-white mt-12`}>
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">{city}</h1>
                                <p className="text-xl md:text-2xl opacity-80">
                                    {weatherData.main}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h2 className="text-6xl md:text-8xl font-bold mb-2 drop-shadow-lg">
                                    {weatherData.tempMin}°C
                                </h2>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-center">
                            <Lottie 
                                options={defaultOptions} 
                                height={300} 
                                width={400} 
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={humidityIcon}
                                        alt="Humidity"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Humidity</p>
                                <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={windIcon}
                                        alt="Wind"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Wind</p>
                                <p className="text-2xl font-bold">{weatherData.wind} km/h</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={visibilityIcon}
                                        alt="Visibility"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Visibility</p>
                                <p className="text-2xl font-bold">{weatherData.visibility} km</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={pressureIcon}
                                        alt="Pressure"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Pressure</p>
                                <p className="text-2xl font-bold">{weatherData.pressure} hPa</p>
                            </div>
                        </div>
                    

                        <div className="grid grid-cols-2 gap-4 mt-20 text-center">
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={sunriseImage}
                                        alt="Sunrise"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Sunrise</p>
                                <p className="text-2xl font-bold">{weatherData.sunrise}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <img
                                        src={sunsetImage}
                                        alt="Sunset"
                                        className="w-12 h-12 object-contain mx-auto mb-2"
                                    />
                                </div>
                                <p className="text-xl opacity-80 mb-1">Sunset</p>
                                <p className="text-2xl font-bold">{weatherData.sunset}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSummary;