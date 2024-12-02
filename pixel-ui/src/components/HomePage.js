import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const API_URL = 'https://heatstrokewristband.onrender.com/api/weather'; // 后端 API 地址
const ARDUINO_API_URL = 'https://arduino-backend-url.com/api/sensors'; // Arduino 后端 API 地址
const HomePage = () => {
  const navigate = useNavigate();
  const [uvIndex, setUvIndex] = useState(null); // UV Index
  const [temperature, setTemperature] = useState(null); // Temperature
  const [weatherIcon, setWeatherIcon] = useState(null); // Weather Icon
  const [location, setLocation] = useState({ lat: null, lon: null }); // Latitude and Longitude


  // Arduino 数据
  const [uvIndexArduino, setUvIndexArduino] = useState(null); // 从 Arduino 获取的 UV Index
  const [temperatureArduino, setTemperatureArduino] = useState(null); // 从 Arduino 获取的 Temperature
  const [heartRate, setHeartRate] = useState(null); // 从 Arduino 获取的 Heart Rate


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

  // 获取 Arduino 的数据
  useEffect(() => {
    const fetchArduinoData = async () => {
      try {
        const response = await axios.get(ARDUINO_API_URL);

        // 更新 Arduino 数据
        setTemperatureArduino(response.data.temperature);
        setUvIndexArduino(response.data.uvIndex);
        setHeartRate(response.data.heartRate);
      } catch (error) {
        console.error("Error fetching Arduino data:", error);
      }
    };

    fetchArduinoData();

    // 定时刷新 Arduino 数据
    const interval = setInterval(fetchArduinoData, 5000); // 每隔 5 秒刷新数据
    return () => clearInterval(interval); // 清除定时器
  }, []);


  return (
    <div className="scene">
      {/* Display weather and UV information */}
      <div className='currentWheather'>
        <h1>Weather Information</h1>
        {temperature !== null && <p>Current Temperature: {temperature}°F</p>}
        {uvIndex !== null && <p>Current UV Index: {uvIndex}</p>}
      </div>


      {/* 显示 Arduino 数据 */}
      <div className="ArduinoWheather">
        <h1>Arduino Data</h1>
        {temperatureArduino !== null && (
          <p>Arduino Temperature: {temperatureArduino}°F</p>
        )}
        {uvIndexArduino !== null && <p>Arduino UV Index: {uvIndexArduino}</p>}
        {heartRate !== null && <p>Heart Rate: {heartRate} bpm</p>}
      </div>


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
        <div className="button" onClick={() => navigate('/HeartRate-index', { state: { heartRate } })}>
          Heart Rate
        </div>
      </div>
    </div>
  );
};

export default HomePage;
