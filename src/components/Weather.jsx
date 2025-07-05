import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '1bf5af03d9316476785d410c8b342599'; 

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(res.data);
    } catch (err) {
      alert("City not found ❌");
      setWeatherData(null);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', width: '200px' }}
      />
      <button onClick={getWeather} style={{ marginLeft: '10px', padding: '8px' }}>
        Search
      </button>

      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>🌡️ {weatherData.main.temp} °C</p>
          <p>☁️ {weatherData.weather[0].description}</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
