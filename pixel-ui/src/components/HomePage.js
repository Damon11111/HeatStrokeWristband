import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const API_URL = 'https://heatstrokewristband.onrender.com/api/weather'; // 后端 API 地址

const HomePage = () => {
  const navigate = useNavigate();
  const [uvIndex, setUvIndex] = useState(null); // UV Index
  const [temperature, setTemperature] = useState(null); // Temperature
  const [weatherIcon, setWeatherIcon] = useState(null); // Weather Icon
  const [location, setLocation] = useState({ lat: null, lon: null }); // Latitude and Longitude

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location. Please check your browser settings!");
        }
      );
    } else {
      alert("Your browser does not support geolocation!");
    }
  }, []);

  // Fetch weather and UV data from the backend
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location.lat && location.lon) {
        try {
          const response = await axios.get(API_URL, {
            params: {
              lat: location.lat,
              lon: location.lon,
            },
          });

          // Update temperature, weather icon, and UV data
          setTemperature(response.data.temperature);
          setWeatherIcon(response.data.weatherIcon);
          setUvIndex(response.data.uvIndex);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div className="scene">
      {/* Display weather and UV information */}
      <h1>Weather Information</h1>
      {temperature !== null && <p>Current Temperature: {temperature}°F</p>}
      {uvIndex !== null && <p>UV Index: {uvIndex}</p>}

      {/* Buttons */}
      <div className="buttons">
        <div
          className={`button ${uvIndex > 8 ? 'danger' : ''}`}
          onClick={() => navigate('/uv-index', { state: { uvIndex } })}
        >
          UV Index
        </div>
        <div
          className="button"
          onClick={() =>
            navigate('/Temp-index', { state: { temperature, icon: weatherIcon } })
          }
        >
          Temperature
        </div>
        <div className="button" onClick={() => navigate('/HeartRate-index')}>
          Heart Rate
        </div>
      </div>
    </div>
  );
};

export default HomePage;
