import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TempInfoPage.css';

const CautionTemperature = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <h1>CAUTION TEMPERATURE</h1>
      <div className="box">
      <p>
        <strong>CAUTION</strong> range indicates moderate heat or cool. Take extra precautions for
        dressing yourself for the weather.
      </p>
      <p>This ranges from 32-49°F or 80-95°F.</p>
      <p>
        From 32-49°F, please be sure to wear warm clothing. For 80-95°F, please be sure to stay
        hydrated, wear sunscreen, and wear breathable fabrics!
      </p>
      </div>
      <button className="back-button" onClick={() => navigate('/temp-info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default CautionTemperature;
