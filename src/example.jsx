import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';

function App() {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between SignUp and SignIn form
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle input changes for both SignUp and SignIn
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      sessionStorage.setItem('userData', JSON.stringify(formData));
      setError('');
      alert('SignUp Successful! You can now Sign In.');
      setIsSignUp(false); // Switch to SignIn form after SignUp
    } else {
      setError('Please fill in both fields.');
    }
  };

  // Handle SignIn
  const handleSignIn = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(sessionStorage.getItem('userData'));

    if (storedData) {
      if (
        storedData.username === formData.username &&
        storedData.password === formData.password
      ) {
        setError('');
        alert('SignIn Successful!');
      } else {
        setError('Invalid username or password.');
      }
    } else {
      setError('No user found. Please Sign Up first.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          {error && (
            <Box color="error.main" marginTop={2}>
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}
          <Box marginTop={3}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>
          <Box marginTop={2}>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setIsSignUp(!isSignUp)}
              fullWidth
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
