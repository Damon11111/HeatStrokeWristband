import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="scene">
      <div className="buttons">
        <div className="button" onClick={() => navigate('/uv-index')}>UV Index</div>
        <div className="button">Temperature</div>
        <div className="button">Heart Rate</div>
      </div>
    </div>
  );
};

export default HomePage;
