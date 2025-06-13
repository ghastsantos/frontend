import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginWrapper,
  LoginCard,
  LoginField,
  LoginButton,
  ErrorMsg,
  SecondaryButton
} from './styles';

const Login = () => {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.senha) {
      setError('Preencha todos os campos.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        navigate('/');
      } else {
        setError('E-mail ou senha inválidos.');
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <h2>Faça seu Login</h2>
        <form onSubmit={handleLogin}>
          <LoginField>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </LoginField>
          <LoginField>
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </LoginField>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <LoginButton type="submit">Entrar</LoginButton>
        </form>
        <SecondaryButton type="button" onClick={() => navigate('/cadastro')}>
          Criar Conta
        </SecondaryButton>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;