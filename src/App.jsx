import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedCities from './components/SavedCities';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [savedCities, setSavedCities] = useState([]);

  const apiKey = '1bf5af03d9316476785d410c8b342599';

  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setCity(''); 
      await saveCityToDB(res.data.name);
    } catch (error) {
      alert('City not found ❌');
    }
  };

  const saveCityToDB = async (cityName) => {
    try {
      await axios.post('http://localhost:5000/api/cities', { name: cityName });
      fetchSavedCities();
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const fetchSavedCities = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cities');
      setSavedCities(res.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const deleteCity = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/cities/${name}`);
      fetchSavedCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const handleCityClick = (name) => {
    fetchWeather(name);
  };

  useEffect(() => {
    fetchSavedCities();
  }, []);

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather()}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temperature: {weather.main.temp} °C</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      <SavedCities
        cities={savedCities}
        onDelete={deleteCity}
        onCityClick={handleCityClick} 
      />
    </div>
  );
}

export default App;
