import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TempInfoPage.css';

const DangerTemperature = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <h1>DANGER TEMPERATURE</h1>
      <div className="box">
      <p>
        <strong>DANGER</strong> range indicates extreme heat or cool. Avoid being outdoors if
        possible.
      </p>
      <p>
        This ranges from under 32°F or above 95°F. For under 32°F, please be sure to dress very
        warmly. For over 95°F, please be sure to stay hydrated, wear sunscreen, and wear breathable
        fabrics!
      </p>
      </div>
      <button className="back-button" onClick={() => navigate('/temp-info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default DangerTemperature;
