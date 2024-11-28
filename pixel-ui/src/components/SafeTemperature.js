import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TempInfoPage.css';

const SafeTemperature = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <h1>SAFE TEMPERATURE</h1>
      <div className="box">
      <p>
        <strong>SAFE</strong> range indicates comfortable temperatures with few extra precautions
        taken. This ranges from 50-80 degrees Fahrenheit.
      </p>
      <p>
        You should generally be comfortable and safe in any clothing of your choice and spending
        time outdoors should be comfortable.
      </p>
      <p>Please make sure to remain hydrated and wear your sunscreen regardless!</p>
      </div>
      <button className="back-button" onClick={() => navigate('/temp-info')}>
        Back to Info Page
      </button>
    </div>
  );
};

export default SafeTemperature;
