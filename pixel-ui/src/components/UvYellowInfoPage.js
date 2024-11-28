import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UvDetailedInfoPage.css';

const UvYellowInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="info-detail-page">
      <h1>Green and Yellow LED Light</h1>
      <div className='box'>
        <p>UV Rating of 3-7</p>
        <p>
            The green and yellow LED lights indicate a moderate UV rating. Please head into 
            the shade. Don't forget to wear your sunscreen and stay hydrated!
        </p>
      </div>
      <button className="back-button" onClick={() => navigate('/info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default UvYellowInfoPage;
