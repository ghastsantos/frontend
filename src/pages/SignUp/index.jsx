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
    // Verificação: todos os campos obrigatórios devem estar preenchidos
    const camposObrigatorios = [
      'nome',
      'email',
      'senha',
      'endereco',
      'cidade',
      'estado',
      'data_nascimento',
      'cpf'
    ];
    const algumVazio = camposObrigatorios.some(campo => !form[campo]?.trim());
    if (algumVazio) {
      setError('Preencha todos os campos para criar sua conta.');
      return;
    }
    // Verificação de email/cpf
    try {
      const checkRes = await fetch('http://localhost:3000/api/usuarios/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, cpf: form.cpf }),
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setError('E-mail ou CPF já cadastrado.');
        return;
      }
      // Cadastro normal
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data && data.id) {
        localStorage.setItem('id', data.id);
        navigate('/');
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