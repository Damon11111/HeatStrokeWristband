import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TempPage.css';

const TempPage = () => {
  const navigate = useNavigate();
  const [temperatureData, setTemperatureData] = useState([
    { time: '12:00 AM', temp: 34 },
    { time: '12:30 AM', temp: 36 },
    { time: '1:00 AM', temp: 38 },
    { time: '1:30 AM', temp: 40 },
  ]); // 初始温度数据
  const [currentTemp, setCurrentTemp] = useState(34); // 当前温度

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * 25) + 30; // 随机温度范围：30-55°F
      const newTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }); // 当前时间
      setTemperatureData((prevData) =>
        [...prevData.slice(-5), { time: newTime, temp: newTemp }] // 保留最近 6 个数据点
      );
      setCurrentTemp(newTemp);
    }, 3000); // 每 3 秒更新一次

    return () => clearInterval(interval); // 清除定时器
  }, []);

  // 获取动态天气图标
  const getWeatherIcon = () => {
    if (currentTemp < 32) return '❄️'; // 雪花
    if (currentTemp < 50) return '☁️'; // 云
    return '☀️'; // 太阳
  };

  const panelStyle = {
    backgroundColor:
      currentTemp >= 50 ? 'rgba(144, 238, 144, 0.7)' : 'rgba(255, 165, 0, 0.7)', // 根据温度动态调整背景颜色
    border: '3px solid black',
    boxShadow: '4px 4px 0px black',
  };

  return (
    <div className="Temp-index-page">
      <h1>TEMPERATURE</h1>
      <div className="content">
        {/* 左侧状态 */}
        <div className="left-panel" style={panelStyle}>
          <p>You are in the</p>
          <h3 className={currentTemp >= 50 ? 'safe-range' : 'caution-range'}>
            {currentTemp >= 50 ? 'SAFE' : 'CAUTION'}
          </h3>
          <p>range</p>
          <button className="temp-info-button" onClick={() => navigate('/temp-info')}>ℹ</button>
        </div>

        {/* 中间折线图 */}
        <div className="right-panel">
          <div className="temperature-chart">
            <h2>
              {currentTemp}°F {getWeatherIcon()}
            </h2>
            <svg width="300" height="150">
              <polyline
                fill="none"
                stroke="blue"
                strokeWidth="3"
                strokeLinecap="round"
                points={temperatureData
                  .map(
                    (data, index) => `${index * 60},${150 - (data.temp - 30) * 3}`
                  )
                  .join(' ')}
              />
            </svg>
            <div className="temperature-details">
              {temperatureData.map((data, index) => (
                <div key={index} className="temperature-item">
                  <p>{data.time}</p>
                  <p>{data.temp}°F</p>
                </div>
              ))}
            </div>
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
