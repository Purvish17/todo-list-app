import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
} from '@mui/material';

const SignUpForm = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setMessage('Account created successfully.');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <FormControl fullWidth>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignUp}
        >
          Create Account
        </Button>
        <Typography color="error">{message}</Typography>
      </Box>
    </Container>
  );
};

export default SignUpForm;
