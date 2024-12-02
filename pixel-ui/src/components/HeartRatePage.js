// HeartRatePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeartRatePage.css';

const ARDUINO_API_URL = 'http://localhost:8081/api/sensors';

const HeartRatePage = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [goalBPM, setGoalBPM] = useState(0); // 目标心率
  const [heartRateData, setHeartRateData] = useState([]); // 心率数据数组
  const [currentHeartRate, setCurrentHeartRate] = useState(null); // 当前心率

  useEffect(() => {
    const fetchArduinoData = async () => {
      try {
        const response = await axios.get(ARDUINO_API_URL);

        // 更新心率数据
        const newHeartRate = response.data.heartRate;
        setHeartRateData((prevData) => [...prevData.slice(-9), newHeartRate]);
        setCurrentHeartRate(newHeartRate);
      } catch (error) {
        console.error("Error fetching Arduino data:", error);
      }
    };

    fetchArduinoData();

    // 定时刷新 Arduino 数据
    const interval = setInterval(fetchArduinoData, 5000); // 每隔 5 秒刷新数据
    return () => clearInterval(interval); // 清除定时器
  }, []);

  const calculateGoalBPM = () => {
    if (age) {
      setGoalBPM(Math.floor((220 - age) * 0.7)); // 目标心率为最大心率的70%
    }
  };

  const getHeartRateRange = () => {
    if (currentHeartRate < 60 || currentHeartRate > 100) return 'DANGER';
    if (currentHeartRate >= 60 && currentHeartRate <= 80) return 'SAFE';
    return 'CAUTION';
  };

  return (
    <div className="heart-rate-page">
      <h1>HEART RATE</h1>
      <div className="content">
        {/* 左侧面板 */}
        <div className="left-panel">
          <p>Your age:</p>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={calculateGoalBPM}
          />
          <p>Estimated Goal BPM:</p>
          <h2>{goalBPM || '--'}</h2>
          <p>You are in the</p>
          <h3 className={getHeartRateRange().toLowerCase()}>{getHeartRateRange()}</h3>
          <p>range</p>
        </div>

        {/* 右侧图表 */}
        <div className="right-panel">
          <div className="chart-header">
            <h2>{currentHeartRate !== null ? `${currentHeartRate} BPM` : '-- BPM'}</h2>
            <span>❤️</span>
          </div>
          <svg width="300" height="150">
            <polyline
              fill="none"
              stroke="red"
              strokeWidth="3"
              points={heartRateData
                .map((rate, index) => `${index * 30},${150 - (rate - 50) * 2}`)
                .join(' ')}
            />
          </svg>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default HeartRatePage;
