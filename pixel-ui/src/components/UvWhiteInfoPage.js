import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UvDetailedInfoPage.css';

const UvWhiteInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="info-detail-page">
      <h1>White LED Light</h1>
      <div className='box'>
        <p>UV Rating of 1-2</p>
        <p>
            The white LED light indicates a low UV rating. Feel free to stay safe 
            outdoors and be sure to still apply your sunscreen!
        </p>
      </div>
      <button className="back-button" onClick={() => navigate('/info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default UvWhiteInfoPage;
