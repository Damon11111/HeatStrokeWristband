import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TempInfoPage.css';

const TemperatureInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <h1>TEMPERATURE INFORMATION</h1>
      <div className="box">
      <p>All temperatures fall between one of the below ranges. Click to learn more!</p>
      <div className="buttons">
        <button className="safe-button" onClick={() => navigate('/temp-info/safe')}>
          SAFE
        </button>
        <button className="caution-button" onClick={() => navigate('/temp-info/caution')}>
          CAUTION
        </button>
        <button className="danger-button" onClick={() => navigate('/temp-info/danger')}>
          DANGER
        </button>
      </div>
      </div>
      <button className="back-button" onClick={() => navigate('/Temp-index')}>
        Back to Temp Page
      </button>
    </div>
  );
};

export default TemperatureInfo;
