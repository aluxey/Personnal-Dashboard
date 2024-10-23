import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/weather.css"; // Assuming you have this CSS file for styling

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const city = 'Bordeaux'; // Hardcoded city for now

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching the weather data', error);
      }
    };

    fetchWeather();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  const { location, current } = weatherData;

  return (
    <div>
      <div className="weather-container">
        <div className="weather-card">
          <div className="weather-city">{city}</div>
          <div className="weather-date">{location.localtime}</div>
          <div className="weather-icon">
            <img src={current.condition.icon} alt="weather icon"/>
          </div>
          <div className="weather-temp-container">
            <div className="weather-temp">{current.temp_c}</div>
            <div className="weather-condition">
              <div>{current.condition.text}</div>
              <div className="weather-temp-high">
                <span className="icon"><i className="far fa-long-arrow-up"></i></span>
                <span className="temp">28°C</span>
              </div>
              <div className="weather-temp-low">
                <span className="icon"><i className="far fa-long-arrow-down"></i></span>
                <span className="temp">20°C</span>
              </div>
            </div>
          </div>
          <div className="weather-info-container">
            <div className="weather-info">
              <div className="label">Wind</div>
              <div className="value">{current.wind_kph} km/h</div>
            </div>
            <div className="weather-info">
              <div className="label">Humidity</div>
              <div className="value">{current.humidity} %</div>
            </div>
            <div className="weather-info">
              <div className="label">Visibility</div>
              <div className="value">{current.vis_km} km</div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Weather;
