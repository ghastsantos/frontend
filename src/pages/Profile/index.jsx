import React, { useEffect, useState } from 'react';
import { ProfileWrapper, ProfileCard, ProfileField, EditButton, SaveButton, LogoutButton, ErrorMsg } from './styles';
import Button from '../../componets/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:3000/api/usuarios/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setForm(data);
      });
  }, [userId, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erro ao atualizar perfil');
      setUser(form);
      setEditMode(false);
    } catch (err) {
      setError('Erro ao salvar alterações.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/login');
  };

  if (!user) return <ProfileWrapper>Carregando...</ProfileWrapper>;

  return (
    <ProfileWrapper>
      <ProfileCard>
        <h2>Meu Perfil</h2>
        <form onSubmit={handleSave}>
          <ProfileField>
            <label>Nome:</label>
            <input name="nome" value={form.nome || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>Email:</label>
            <input name="email" value={form.email || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>Endereço:</label>
            <input name="endereco" value={form.endereco || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>Cidade:</label>
            <input name="cidade" value={form.cidade || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>Estado:</label>
            <input name="estado" value={form.estado || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>Data de Nascimento:</label>
            <input type="date" name="data_nascimento" value={form.data_nascimento ? form.data_nascimento.split('T')[0] : ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          <ProfileField>
            <label>CPF:</label>
            <input name="cpf" value={form.cpf || ''} onChange={handleChange} disabled={!editMode} />
          </ProfileField>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
            {!editMode ? (
              <EditButton type="button" onClick={handleEdit}>Editar</EditButton>
            ) : (
              <SaveButton type="submit">Salvar</SaveButton>
            )}
            <LogoutButton type="button" onClick={handleLogout}>Logout</LogoutButton>
          </div>
        </form>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;