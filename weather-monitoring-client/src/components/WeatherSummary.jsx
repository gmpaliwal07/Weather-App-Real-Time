import { useState, useEffect } from "react";
import Card from "./Card";
import SunCycle from "./SunCycle";
import axios from "axios";
import Lottie from "react-lottie";
import LoadingAnimation from "../lotties/loading.json"; // Ensure the path is correct

const WeatherSummary = ({ city }) => {
  const [tempMin, setTempMin] = useState(null);
  const [main, setMain] = useState('');
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
        const data = response.data.weather;

        setTempMin((data.low_temp - 273.15).toFixed(2));
        setHumidity(data.humidity);
        setWind(data.wind_speed);
        setMain(data.main);
        setVisibility((data.visibility / 1000).toFixed(2));
        setPressure(data.pressure);

        const sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setSunrise(sunriseTime);
        setSunset(sunsetTime);

        // Simulate delay
        setTimeout(() => setLoading(false), 2000);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data."); // Set error message
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const data = [
    { img: "/assets/humidity.svg", title: "Humidity", value: `${humidity}%` },
    { img: "/assets/wind.svg", title: "Wind", value: `${wind} km/h` },
    { img: "/assets/visiblity.svg", title: "Visibility", value: `${visibility} km` },
    { img: "/assets/pressure.svg", title: "Pressure", value: `${pressure} hPa` },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Lottie options={loadingOptions} height={150} width={150} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-xl p-8">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-x-8 ">
      <div className="p-8 md:w-1/2">
        <span className="text-text font-mono text-2xl md:text-4xl font-bold mb-4">
          {main}, {tempMin}°C
        </span>
        <div className="border-b-[1px] border-secondary mt-3" />
        <div className="grid  grid-flow-row md:grid-cols-3 gap-4 mt-8">
          {data.map((item, index) => (
            <Card  key={index} img={item.img} title={item.title} value={item.value} />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:justify-center gap-y-4">
        <SunCycle />
        <div className="grid  md:grid-flow-row md:grid-cols-3 md:gap-4 gap-8 mt-8">
          <Card value={sunrise} title={"Sunrise"} />
          <Card value={sunset} title={"Sunset"} />
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
