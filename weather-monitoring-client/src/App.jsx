import './App.css';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar';
import WeatherSummary from './components/WeatherSummary';
import RollupAggregateDisplay from './components/RollupsAndAggregate';
import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('Mumbai'); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSearch = async (searchedCity) => {
    setCity(searchedCity);
    setLoading(true);
    setError(null); 

  
    
    setLoading(false); 
  };

  return (
    <>
      <div className="bg-primary min-h-screen ">
      <Navbar onSearch={handleSearch} />
        <DisplayWeather city={city} loading={loading} error={error}/>
        <WeatherSummary city={city} loading={loading} error={error} />
        <RollupAggregateDisplay city={city} loading={loading} error={error} />
      </div>
    </>
  );
}

export default App;
