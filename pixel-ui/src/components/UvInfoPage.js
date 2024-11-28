import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UvInfoPage.css';

const UvInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <h1>LED UV Ratings</h1>
      <p>
        Each LED light on your wristband indicates the current UV light rating in your location. 
        The following is the key to reading these lights!
      </p>
      <div className="button-container">
        {/* 白色按钮 */}
        <button
          className="info-button white"
          onClick={() => navigate('/white-info')}
        >
          WHITE
        </button>
        {/* 黄色按钮 */}
        <button
          className="info-button yellow"
          onClick={() => navigate('/yellow-info')}
        >
          GREEN <br /> YELLOW
        </button>
        {/* 红色按钮 */}
        <button
          className="info-button red"
          onClick={() => navigate('/red-info')}
        >
          BLUE <br /> RED
        </button>
      </div>
      <button className="back-button" onClick={() => navigate('/uv-index')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default UvInfoPage;
