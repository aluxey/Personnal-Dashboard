import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/weatherFull.css";

const WeatherFull = () => {
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

    const { location, current } = weatherData;

    return (
        <div className="weather-container">
            <section className="weather-header">
                <h1>Weather in {location.name}, {location.region}, {location.country}</h1>
                <div className="time">
                    <p>Local Time: {location.localtime}</p>
                    <p>Last Updated: {current.last_updated}</p>
                </div>
            </section>

            <section className="weather-conditions">
            <h2>Current Conditions</h2>
                <div className="weather-temp">
                    <p>Temperature: <span>{current.temp_c}°C</span> / <span>{current.temp_f}°F</span>
                    <br/>Feels Like: <span>{current.feelslike_c}°C</span> / <span>{current.feelslike_f}°F</span></p>
                </div>
                <div className="weather-icon">
                    <img src={current.condition.icon} alt={current.condition.text} />
                    <p>{current.condition.text}</p>
                </div>
            </section>

            <div className="details">
                <section className="weather-details">
                    <h2>Wind</h2>
                    <p>Wind Speed: {current.wind_kph} kph / {current.wind_mph} mph</p>
                    <p>Direction: {current.wind_dir}</p>
                    <p>Gusts: {current.gust_kph} kph / {current.gust_mph} mph</p>
                </section>

                <section className="weather-atmosphere">
                    <h2>Atmospheric Conditions</h2>
                    <p>Pressure: {current.pressure_mb} mb / {current.pressure_in} in</p>
                    <p>Precipitation: {current.precip_mm} mm / {current.precip_in} in</p>
                    <p>Humidity: {current.humidity}%</p>
                    <p>Cloud Cover: {current.cloud}%</p>
                    <p>Visibility: {current.vis_km} km / {current.vis_miles} miles</p>
                </section>

                <section className="weather-extra">
                    <h2>Additional Information</h2>
                    <p>Dew Point: {current.dewpoint_c}°C / {current.dewpoint_f}°F</p>
                    <p>UV Index: {current.uv}</p>
                </section>
            </div>

        </div>
    );
};

export default WeatherFull;
