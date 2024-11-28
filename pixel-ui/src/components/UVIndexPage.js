import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './UVIndexPage.css';

const UVIndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 获取路由状态
  const uvIndex = location.state?.uvIndex || 0; // 从 HomePage 获取 UV Index

  const isDanger = uvIndex > 8;

  return (
    <div className="uv-index-page">
      <h1>UV INDEX</h1>
      <div className="content">
        <div className="left-panel">
          <p>Your local UV Index:</p>
          <h2><strong>{uvIndex}</strong></h2>
          <p>You are in the</p>
          <h3 className={isDanger ? 'danger-range' : 'safe-range'}>
          {isDanger ? 'DANGER' : 'SAFE'}</h3>
          <p>range</p>
          <button className="info-button" onClick={() => navigate('/info')}>
            !
          </button>
        </div>
        <div className="right-panel">
          <h3>UV INDEX</h3>
          <div className="uv-display">
            <h1>{uvIndex}</h1>
            <p>{uvIndex <= 2 ? 'Low' : uvIndex <= 5 ? 'Moderate' : 'High'}</p>
            <div className="uv-bar">
              <div
                className="uv-bar-indicator"
                style={{ left: `${(uvIndex / 11) * 100}%` }}
              ></div>
            </div>
            <p>{uvIndex <= 2 ? 'Low levels all day.' : 'Take precautions.'}</p>
          </div>
        </div>
      </div>
      
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default UVIndexPage;
