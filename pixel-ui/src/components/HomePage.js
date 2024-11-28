import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [uvIndex, setUvIndex] = useState(5); // 默认 UV Index

  return (
    <div className="scene">
      {/* UV Index 信息 */}
      <h1>Current UV Index: {uvIndex}</h1>
      
      {/* 按钮区 */}
      <div className="buttons">
        <div
          className={`button ${uvIndex > 8 ? 'danger' : ''}`}
          onClick={() => navigate('/uv-index', { state: { uvIndex } })}
        >
          UV Index
        </div>
        <div className="button" onClick={() => navigate('/Temp-index')}>Temperature</div>
        <div className="button" onClick={() => navigate('/HeartRate-index')}>Heart Rate</div>
      </div>

      {/* UV Index 控制区 */}
      <div className="controls">
        <button onClick={() => setUvIndex(5)}>Set UV Index to 5</button>
        <button onClick={() => setUvIndex(10)}>Set UV Index to 10</button>
      </div>
    </div>
  );
};

export default HomePage;
