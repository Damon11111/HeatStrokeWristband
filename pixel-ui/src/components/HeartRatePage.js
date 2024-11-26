import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeartRatePage.css';

const HeartRatePage = () => {
  const navigate = useNavigate();
  return (
    <div className="HeartRate-index-page">
      <h1>HEART RATE</h1>
      <div className="content">
    
       
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default HeartRatePage;
