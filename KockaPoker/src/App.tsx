import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import PlayerPage from './PlayerPage';
import Final from './Final';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/player/:playerIndex" element={<PlayerPage />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  );
};

export default App;