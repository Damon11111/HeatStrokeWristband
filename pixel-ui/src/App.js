import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UVIndexPage from './components/UVIndexPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uv-index" element={<UVIndexPage />} />
      </Routes>
    </Router>
  );
};

export default App;
