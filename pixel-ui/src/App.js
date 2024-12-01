import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UVIndexPage from './components/UVIndexPage';
import TempPage from './components/TempPage';
import HeartRatePage from './components/HeartRatePage';
import UvInfoPage from './components/UvInfoPage';
import UvWhiteInfoPage from './components/UvWhiteInfoPage';
import UvYellowInfoPage from './components/UvYellowInfoPage';
import UvRedInfoPage from './components/UvRedInfoPage';
import TemperatureInfo from './components/TempInfoPage';
import SafeTemperature from './components/SafeTemperature';
import CautionTemperature from './components/CautionTemperature';
import DangerTemperature from './components/DangerTemperature';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uv-index" element={<UVIndexPage />} />
        <Route path="/Temp-index" element={<TempPage />} />
        <Route path="/HeartRate-index" element={<HeartRatePage />} />
        <Route path="/info" element={<UvInfoPage />} />
        <Route path="/white-info" element={<UvWhiteInfoPage />} />
        <Route path="/yellow-info" element={<UvYellowInfoPage />} />
        <Route path="/red-info" element={<UvRedInfoPage />} />
        <Route path="/temp-info" element={<TemperatureInfo />} />
        <Route path="/temp-info/safe" element={<SafeTemperature />} />
        <Route path="/temp-info/caution" element={<CautionTemperature />} />
        <Route path="/temp-info/danger" element={<DangerTemperature />} />
      </Routes>
    </Router>
  );
};

export default App;
