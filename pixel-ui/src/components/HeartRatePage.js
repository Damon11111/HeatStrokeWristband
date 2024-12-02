import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HeartRatePage.css';

const HeartRatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 从主页按钮传递的心率数据
  const initialHeartRateData = location.state?.heartRateData || [60, 65, 70];
  const initialHeartRate = initialHeartRateData[initialHeartRateData.length - 1];

  const [age, setAge] = useState('');
  const [goalBPM, setGoalBPM] = useState(0); // 目标心率
  const [heartRateData, setHeartRateData] = useState(initialHeartRateData); // 初始心率数据
  const [currentHeartRate, setCurrentHeartRate] = useState(initialHeartRate); // 当前心率

  useEffect(() => {
    // 模拟实时心率数据更新
    const interval = setInterval(() => {
      if (location.state?.heartRateData) {
        const newHeartRate =
          location.state.heartRateData[
            Math.floor(Math.random() * location.state.heartRateData.length)
          ];
        setHeartRateData((prevData) => [...prevData.slice(-9), newHeartRate]);
        setCurrentHeartRate(newHeartRate);
      }
    }, 2000);

    return () => clearInterval(interval); // 清除定时器
  }, [location.state?.heartRateData]);

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
            <h2>{currentHeartRate} BPM</h2>
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
