import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SignUpWrapper,
  SignUpCard,
  SignUpField,
  SignUpButton,
  ErrorMsg,
  SecondaryButton
} from './styles';

const SignUp = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    endereco: '',
    cidade: '',
    estado: '',
    data_nascimento: '',
    cpf: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    // Validação simples
    if (!form.nome || !form.email || !form.senha) {
      setError('Preencha nome, email e senha.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data && data.id) {
        localStorage.setItem('id', data.id);
        navigate('/perfil');
      } else {
        setError(data.error || 'Erro ao cadastrar. Tente outro e-mail.');
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    }
  };

  return (
    <SignUpWrapper>
      <SignUpCard>
        <h2>Criar Conta</h2>
        <form onSubmit={handleSignUp}>
          <SignUpField>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              autoComplete="name"
            />
          </SignUpField>
          <SignUpField>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </SignUpField>
          <SignUpField>
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </SignUpField>
          <SignUpField>
            <label>Endereço:</label>
            <input
              type="text"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
            />
          </SignUpField>
          <SignUpField>
            <label>Cidade:</label>
            <input
              type="text"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
            />
          </SignUpField>
          <SignUpField>
            <label>Estado:</label>
            <input
              type="text"
              name="estado"
              value={form.estado}
              onChange={handleChange}
            />
          </SignUpField>
          <SignUpField>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
            />
          </SignUpField>
          <SignUpField>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
            />
          </SignUpField>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SignUpButton type="submit">Cadastrar</SignUpButton>
        </form>
        <SecondaryButton type="button" onClick={() => navigate('/login')}>
          Já tenho conta
        </SecondaryButton>
      </SignUpCard>
    </SignUpWrapper>
  );
};

export default SignUp;