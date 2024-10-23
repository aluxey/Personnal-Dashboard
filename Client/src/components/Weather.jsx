import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/weather.css"

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city,] = useState('Bordeaux');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching the weather data', error);
      }
    };
    fetchWeather();
  }, [city]);

  if (!weatherData) return <div>Loading...</div>;

  const { location } = weatherData;

  return (
      <div>
        {weatherData && (
            <div className="weather-container">
              <div className="weather-card">
                <div className="weather-city">{city}</div>
                <div className="weather-date">{location.localtime}</div>
                <div className="weather-icon">
                  <img src={weatherData.current.condition.icon} alt="weather icon"/>
                </div>
                <div className="weather-temp-container">
                  <div className="weather-temp">{weatherData.current.temp_c}</div>
                  <div className="weather-condition">
                    <div>{weatherData.current.condition.text}</div>
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
                    <div className="value">{weatherData.current.wind_kph} km/h</div>
                  </div>
                  <div className="weather-info">
                    <div className="label">Humidity</div>
                    <div className="value">{weatherData.current.humidity} %</div>
                  </div>
                  <div className="weather-info">
                    <div className="label">Visibility</div>
                    <div className="value">{weatherData.current.vis_km} km</div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default Weather;