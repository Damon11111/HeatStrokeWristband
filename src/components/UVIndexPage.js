import React from 'react';
import './UVIndexPage.css';

const UVIndexPage = () => {
  return (
    <div className="uv-index-page">
      <h1>UV INDEX</h1>
      <div className="content">
        <div className="left-panel">
          <p>Your local UV Index:</p>
          <h2>##</h2>
          <p>You are in the</p>
          <h3 className="safe-range">SAFE</h3>
          <p>range</p>
        </div>
        <div className="right-panel"></div>
      </div>
    </div>
  );
};

export default UVIndexPage;
