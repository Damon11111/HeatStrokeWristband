import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UVIndexPage from './components/UVIndexPage';
import TempPage from './components/TempPage';
import HeartRatePage from './components/HeartRatePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uv-index" element={<UVIndexPage />} />
        <Route path="/Temp-index" element={<TempPage />} />
        <Route path="/HeartRate-index" element={<HeartRatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
