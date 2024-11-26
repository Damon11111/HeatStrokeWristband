import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TempPage.css';

const TempPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Temp-index-page">
      <h1>TEMPTRATURE</h1>
      <div className="content">
    
       
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default TempPage;
