import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TempPage.css';

const TempPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get temperature and icon from HomePage
  const temperature = location.state?.temperature || 0;
  const weatherIcon = location.state?.icon || "01d"; // Default to clear sky

  // Map OpenWeatherMap icons to emojis
  const getWeatherEmoji = (icon) => {
    const iconMap = {
      "01d": "☀️", // Clear sky (day)
      "01n": "🌙", // Clear sky (night)
      "02d": "⛅", // Few clouds (day)
      "02n": "☁️", // Few clouds (night)
      "03d": "☁️", // Scattered clouds (day)
      "03n": "☁️", // Scattered clouds (night)
      "04d": "🌥️", // Broken clouds (day)
      "04n": "🌥️", // Broken clouds (night)
      "09d": "🌧️", // Shower rain (day)
      "09n": "🌧️", // Shower rain (night)
      "10d": "🌦️", // Rain (day)
      "10n": "🌦️", // Rain (night)
      "11d": "⛈️", // Thunderstorm (day)
      "11n": "⛈️", // Thunderstorm (night)
      "13d": "❄️", // Snow (day)
      "13n": "❄️", // Snow (night)
      "50d": "🌫️", // Mist (day)
      "50n": "🌫️", // Mist (night)
    };

    return iconMap[icon] || "❓";
  };

  // Determine weather status
  const getWeatherStatus = () => {
    if (temperature < 32) return "DANGER"; // Extreme cold
    if (temperature < 50) return "CAUTION"; // Moderate cold
    if (temperature <= 80) return "SAFE"; // Comfortable
    return "DANGER"; // Extreme heat
  };

  // Get the panel background color based on temperature
  const getPanelStyle = () => {
    if (temperature < 32 || temperature > 80) {
      return {
        backgroundColor: 'rgba(255, 69, 0, 0.7)', // DANGER (red-orange)
        color: 'white',
      };
    }
    if (temperature < 50) {
      return {
        backgroundColor: 'rgba(255, 165, 0, 0.7)', // CAUTION (orange)
        color: 'black',
      };
    }
    return {
      backgroundColor: 'rgba(144, 238, 144, 0.7)', // SAFE (green)
      color: 'black',
    };
  };

  const weatherStatus = getWeatherStatus();
  const panelStyle = getPanelStyle();

  return (
    <div className="Temp-index-page">
      <h1>TEMPERATURE</h1>
      <div className="content">
        {/* Left Panel */}
        <div className="left-panel" style={panelStyle}>
          <p>You are in the</p>
          <h3 className={`${weatherStatus.toLowerCase()}-range`}>
            {weatherStatus}
          </h3>
          <p>range</p>
          <button className="temp-info-button" onClick={() => navigate('/temp-info')}>ℹ</button>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="temperature-chart">
            <h2>
              <strong>{temperature}</strong>°F {getWeatherEmoji(weatherIcon)}
            </h2>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default TempPage;
