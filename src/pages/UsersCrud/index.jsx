import React, { useState, useEffect } from 'react';
import {
  PageWrapper,
  UsersGridWrapper,
  Card,
  ModalOverlay,
  ModalContainer,
  FormField,
  FormActions,
} from './styles';
import Button from '../../componets/Button';

const UsersCrud = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = novo usuário
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    senha: '',
    endereco: '',
    cidade: '',
    estado: '',
    data_nascimento: '',
    cpf: '',
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/usuarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Falha ao carregar usuários');
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalForCreate = () => {
    setEditingUser(null);
    setFormValues({
      nome: '',
      email: '',
      senha: '',
      endereco: '',
      cidade: '',
      estado: '',
      data_nascimento: '',
      cpf: '',
    });
    setIsModalOpen(true);
  };

  const openModalForEdit = (user) => {
    setEditingUser(user);
    setFormValues({
      nome: user.nome,
      email: user.email,
      senha: '',
      endereco: user.endereco,
      cidade: user.cidade,
      estado: user.estado,
      data_nascimento: user.data_nascimento || '',
      cpf: user.cpf || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsuarios();
      } else {
        console.error('Erro ao deletar usuário');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Só verifica se for novo usuário ou se email/cpf mudou
      if (!editingUser || formValues.email !== editingUser.email || formValues.cpf !== editingUser.cpf) {
        const checkRes = await fetch('http://localhost:3000/api/usuarios/verificar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formValues.email, cpf: formValues.cpf }),
        });
        const checkData = await checkRes.json();
        if (checkData.exists) {
          alert('E-mail ou CPF já cadastrado.');
          return;
        }
      }
      let res;
      if (editingUser) {
        // Atualizar usuário
        res = await fetch(`http://localhost:3000/api/usuarios/${editingUser.id}`, {
          method: 'PUT',
          body: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        // Criar novo usuário
        res = await fetch('http://localhost:3000/api/usuarios', {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!res.ok) throw new Error('Erro ao enviar dados');
      closeModal();
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrapper>
      <h1>Gerenciar Usuários</h1>
      <Button onClick={openModalForCreate}>Adicionar Novo Usuário</Button>
      <UsersGridWrapper>
        {usuarios.map((user) => (
          <Card key={user.id}>
            <h2>{user.nome}</h2>
            <p>Email: {user.email}</p>
            <p>Endereço: {user.endereco}</p>
            <p>Cidade: {user.cidade}</p>
            <p>Estado: {user.estado}</p>
            <p>Data de Nascimento: {user.data_nascimento ? user.data_nascimento.split('T')[0] : ''}</p>
            <p>CPF: {user.cpf}</p>
            <Button onClick={() => openModalForEdit(user)}>Editar</Button>
            <Button onClick={() => handleDelete(user.id)}>Deletar</Button>
          </Card>
        ))}
      </UsersGridWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <form onSubmit={handleSubmit}>
              <FormField>
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={formValues.senha}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={formValues.endereco}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formValues.cidade}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={formValues.estado}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  name="data_nascimento"
                  value={formValues.data_nascimento}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formValues.cpf}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormActions>
                <Button type="submit">{editingUser ? 'Atualizar' : 'Criar'}</Button>
                <Button type="button" onClick={closeModal}>
                  Cancelar
                </Button>
              </FormActions>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default UsersCrud;