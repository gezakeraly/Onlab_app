import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import './PlayerPage.less';

const PlayerPage: React.FC = () => {
  const { playerIndex } = useParams<{ playerIndex: string }>();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState<string>('');
  const [scores, setScores] = useState<(number | '')[]>(Array(15).fill(''));
  const [round, setRound] = useState<number>(1);

  useEffect(() => {
    try {
      const playerNames = JSON.parse(localStorage.getItem('playerNames') || '[]');
      setPlayerName(playerNames[parseInt(playerIndex || '0', 10)] || 'Ismeretlen játékos');
  
      const playerScores = JSON.parse(localStorage.getItem('playerScores') || '{}');
      if (playerScores[playerNames[parseInt(playerIndex || '0', 10)]]) {
        setScores(playerScores[playerNames[parseInt(playerIndex || '0', 10)]] || Array(15).fill(''));
      }
    } catch (error) {
      console.error('Hiba a localStorage adatainak betöltésekor:', error);
    }
  }, [playerIndex]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newScores = [...scores];
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    newScores[index] = value === '' || parsedValue < 0 ? '' : parsedValue;
    setScores(newScores);
  };

  const handleNext = () => {
    const playerScores = JSON.parse(localStorage.getItem('playerScores') || '{}');
    playerScores[playerName] = scores;
    localStorage.setItem('playerScores', JSON.stringify(playerScores));
    const nextIndex = (parseInt(playerIndex || '0', 10) + 1) % JSON.parse(localStorage.getItem('playerNames') || '[]').length;
    if (nextIndex === 0) {
      setRound(round + 1);
    }
    if (round >= 15 && nextIndex === 0) {
      navigate('/final');
    } else {
      navigate(`/player/${nextIndex}`);
    }
  };

  const schoolTotal = scores.slice(0, 6).reduce((acc, score) => acc + (typeof score === 'number' ? score : 0), 0);
  const totalScore = scores.reduce((acc, score) => acc + (typeof score === 'number' ? score : 0), 0);

  const combinationLabels = ['Egypár', 'Kétpár', 'Drill', 'Póker', 'Full', 'Kis sor', 'Nagy sor', 'Generál', 'Szemét'];

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        {playerName}
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">Iskola</Typography>
        <Box className="input-grid school-grid">
          {[...Array(6)].map((_, index) => (
            <TextField
              key={index}
              type="number"
              label={`Iskola ${index + 1}`}
              variant="outlined"
              fullWidth
              value={scores[index] === '' ? '' : scores[index]}
              onChange={(event) => handleChange(index, event)}
            />
          ))}
        </Box>
        <Typography variant="h6" className="total-score">Iskola összesen: {schoolTotal}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Kombinációk</Typography>
        <Box className="input-grid combination-grid">
          {combinationLabels.map((label, index) => (
            <TextField
              key={index + 6}
              type="number"
              label={label}
              variant="outlined"
              fullWidth
              value={scores[index + 6] === '' ? '' : scores[index + 6]}
              onChange={(event) => handleChange(index + 6, event)}
            />
          ))}
        </Box>
        <Typography variant="h6" className="total-score">Összesen: {totalScore}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleNext}>
        {round >= 15 && parseInt(playerIndex || '0', 10) === JSON.parse(localStorage.getItem('playerNames') || '[]').length - 1 ? 'End' : 'Next'}
      </Button>
    </Container>
  );
};

export default PlayerPage;