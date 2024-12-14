import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import WeatherSummary from './components/WeatherSummary';
import RollupAggregateDisplay from './components/RollupsAndAggregate';
import  { useState } from 'react';

function App() {
  const [city, setCity] = useState('Mumbai'); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSearch = async (searchedCity) => {
    setCity(searchedCity);
    setLoading(true);
    setError(null); 

    try {
      // Verify city data exists - you might want to replace this with your actual API endpoint
      const response = await axios.get(`http://localhost:3000/summary?city=${searchedCity}`);
      
      // If no error is thrown, the city exists
      setLoading(false);
    } catch (err) {
      // Handle errors if city is not found or API call fails
      setError(`Could not find weather data for ${searchedCity}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <Navbar onSearch={handleSearch} />
      <WeatherSummary city={city} loading={loading} error={error} />
      <RollupAggregateDisplay city={city} loading={loading} error={error} />
    </div>
  );
}

export default App;