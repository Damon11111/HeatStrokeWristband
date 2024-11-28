import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UvDetailedInfoPage.css';

const UvRedInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="info-detail-page">
      <h1>Blue and Red LED Light</h1>
      <div className='box'>
        <p>UV Rating 8+</p>
        <p>
            The blue and red LED lights indicate a high to extreme UV rating. Head 
            inside and stay cool! Please remain out of the sun if possible. Remember 
            to stay well hydrated!
        </p>
      </div>
      <button className="back-button" onClick={() => navigate('/info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default UvRedInfoPage;
