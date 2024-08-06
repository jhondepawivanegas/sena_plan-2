import React, { useState } from "react";
import styled from "styled-components";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Por favor, complete todos los campos.");
      return;
    }

    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    setError("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Iniciar Sesión</Title>
        <Label htmlFor="username">Nombre de Usuario</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
        />
        <Label htmlFor="password">Contraseña</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
        />
        <Button type="submit">Iniciar Sesión</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </Container>
  );
}

// Estilos usando styled-components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.formBg};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.error};
  margin-top: 10px;
  text-align: center;
`;

export default LoginForm;
