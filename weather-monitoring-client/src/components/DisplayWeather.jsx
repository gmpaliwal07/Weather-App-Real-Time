import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import Cloudy from '../lotties/Cloudy.json'; 
import Rainy from '../lotties/Rainy.json'; 
import Sunny from '../lotties/Sunny.json'; 
import Wind from '../lotties/wind-day.json'; 
import Thunderstorm from '../lotties/thunderstorm.json';
import loadingAnimation from '../lotties/loading.json';
const DisplayWeather = ({ city, onLoaded }) => {
    const [temperature, setTemperature] = React.useState(null);
    const [feelsLike, setFeelsLike] = React.useState(null);
    const [condition, setCondition] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const getAnimationData = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return Sunny;
            case 'rain':
                return Rainy;
            case 'cloudy':
                return Cloudy;
            case 'windy':
                return Wind;
            case 'thunderstorm':
                return Thunderstorm;
            default:
                return Cloudy; 
        }
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
            const data = response.data.weather;
            const temp = (data.temp - 273.15).toFixed(1);
            const feels_like = (data.feels_like - 273.15).toFixed(1);
            
            setTemperature(temp);
            setFeelsLike(feels_like);
            setCondition(data.main);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
            if (onLoaded) onLoaded(); // Notify parent component when loading is complete
        }
    }

    useEffect(() => {
        setLoading(true); // Reset loading state when city changes
        fetchWeatherData();
    }, [city]);

    const animationData = getAnimationData(condition);
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
            <div className="flex items-center justify-center min-h-screen bg-primary">
               <Lottie options={loadingAnimation}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="p-10  pt-24"> 
                <div className="flex flex-col pt-24">
                    <h1 className="text-text font-mono text-4xl font-bold mb-4">{city}</h1> 
                    <span className="text-text font-mono text-2xl font-semibold">
                        {temperature ? `Feels like ${feelsLike}°` : "Loading..."}
                    </span>
                </div>

                <div className="flex md:flex-row flex-col pt-20 justify-around">
                    <div className="flex flex-col items-center justify-center text-center mb-4">
                        <h1 className="text-text text-center font-serif md:text-6xl text-4xl font-bold mb-2">
                            {temperature}°C
                        </h1>
                        <h3 className="text-text font-mono md:text-3xl text-2xl">
                            {condition}
                        </h3>
                    </div>
                    <div className="flex justify-center items-center mb-4">
    <Lottie options={defaultOptions}  height={400} width={500} />
</div>

                </div>
            </div>
        </div>
    );
};

export default DisplayWeather;
