import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Final.less';

const Final: React.FC = () => {
  const [playerScores, setPlayerScores] = useState<{ [key: string]: number[] }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('playerScores') || '{}');
    setPlayerScores(scores);
  }, []);

  const handleNewGame = () => {
    localStorage.clear();
    navigate('/home');
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Végső Eredmények
      </Typography>
      <Paper className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Játékos</th>
              <th>Iskola Összesen</th>
              <th>Kombinációk Összesen</th>
              <th>Összesen</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(playerScores).map((playerName) => {
              const scores = playerScores[playerName];
              const schoolTotal = scores.slice(0, 6).reduce((acc, score) => acc + score, 0);
              const combinationTotal = scores.slice(6).reduce((acc, score) => acc + score, 0);
              const totalScore = scores.reduce((acc, score) => acc + score, 0);
              return (
                <tr key={playerName}>
                  <td>{playerName}</td>
                  <td>{schoolTotal}</td>
                  <td>{combinationTotal}</td>
                  <td>{totalScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleNewGame} className="new-game-button">
        New Game
      </Button>
    </Container>
  );
};

export default Final;