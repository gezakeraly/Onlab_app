import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.less';

const Home: React.FC = () => {
  const [names, setNames] = useState<string[]>(['']);
  const navigate = useNavigate();

  const handleAddName = () => {
    setNames([...names, '']);
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newNames = [...names];
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement;
    newNames[index] = value;
    setNames(newNames);
  };

  const handleStart = () => {
    const validNames = names.filter(name => name.trim() !== '');
    localStorage.setItem('playerNames', JSON.stringify(validNames));
    const playerScores: { [key: string]: (number | '')[] } = {};
    validNames.forEach(name => {
      playerScores[name] = Array(15).fill('');
    });
    localStorage.setItem('playerScores', JSON.stringify(playerScores));
    navigate('/player/0');
  };

  return (
    <Container className="container">
      <Typography variant="h3" gutterBottom>
        Kockapóker
      </Typography>
      {names.map((name, index) => (
        <Box key={index} mb={2}>
          <TextField
            label={`Név ${index + 1}`}
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => handleChange(index, event)}
          />
        </Box>
      ))}
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddName}>
          Add
        </Button>
      </Box>
      <Button variant="contained" id="start-button" onClick={handleStart}>
        Start
      </Button>
    </Container>
  );
};

export default Home;