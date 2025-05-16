import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Congratulations.less';

const Congratulations: React.FC = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.clear();
    navigate('/home');
  };

  return (
    <div className="congratulations-container">
      <h1>GRATULÁLOK!</h1>
      <button onClick={handleNewGame} className="new-game-button">
        Új játék
      </button>
    </div>
  );
};

export default Congratulations;