import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="scene">
      <div className="buttons">
        <div className="button" onClick={() => navigate('/uv-index')}>UV Index</div>
        <div className="button" onClick={() => navigate('/Temp-index')}>Temperature</div>
        <div className="button" onClick={() => navigate('/HeartRate-index')}>Heart Rate</div>
      </div>
    </div>
  );
};

export default HomePage;
