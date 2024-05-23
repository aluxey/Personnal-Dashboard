import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, ] = useState('Bordeaux'); 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );  
        setWeatherData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching the weather data', error);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div> 
      {weatherData && (     
        

        <div class="flex items-center justify-center border-solid border-4 border-gray-600">
            <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        		<div class="font-bold text-xl">{city}</div>
        		<div class="text-sm text-gray-500">Thursday 10 May 2020</div>
        		<div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img src={weatherData.current.condition.icon} alt="weather icon" />
            </div>

        	<div class="flex flex-row items-center justify-center mt-6">
        		<div class="font-medium text-6xl">{weatherData.current.temp_c}</div>
        		<div class="flex flex-col items-center ml-6">
        			<div>{weatherData.current.condition.text}</div>
        			<div class="mt-1">
        				<span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
        				<span class="text-sm font-light text-gray-500">28°C</span>
        			</div>
        			<div>
        				<span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
        				<span class="text-sm font-light text-gray-500">20°C</span>
        			</div>
        		</div>
        	</div>
        	<div class="flex flex-row justify-between mt-6">
        		<div class="flex flex-col items-center">
        			<div class="font-medium text-sm">Wind</div>
        			<div class="text-sm text-gray-500">{weatherData.current.wind_kph} km/h</div>
        		</div>
        		<div class="flex flex-col items-center">
        			<div class="font-medium text-sm">Humidity</div>
        			<div class="text-sm text-gray-500">{weatherData.current.humidity} %</div>
        		</div>
        		<div class="flex flex-col items-center">
        			<div class="font-medium text-sm">Visibility</div>
        			<div class="text-sm text-gray-500">{weatherData.current.vis_km} km</div>
        		</div>
        	</div>
        	</div>
        </div>
      )}
    </div>
  );
};

export default Weather;