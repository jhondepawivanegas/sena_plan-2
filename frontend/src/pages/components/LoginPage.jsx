    // src/components/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@atomit-design/core';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      style={{ maxWidth: 400, margin: '5% auto', padding: '2rem' }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
