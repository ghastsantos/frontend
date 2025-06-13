import React, { useState, useEffect } from 'react';
import {
  PageWrapper,
  ProductsGridWrapper,
  ModalOverlay,
  ModalContainer,
  FormField,
  FormActions,
} from './styles';
import Button from '../../componets/Button';

const CategoriesCrud = () => {
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [nome, setNome] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/categorias', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Falha ao carregar categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModalForCreate = () => {
    setEditingCategoria(null);
    setNome('');
    setIsModalOpen(true);
  };

  const openModalForEdit = (categoria) => {
    setEditingCategoria(categoria);
    setNome(categoria.nome);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategoria(null);
    setNome('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/categorias/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        fetchCategorias();
      } else {
        console.error('Erro ao deletar categoria');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoria) {
        // PUT (edição)
        const res = await fetch(`http://localhost:3000/api/categorias/${editingCategoria.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
        if (!res.ok) throw new Error('Erro ao atualizar categoria');
      } else {
        // POST (criação)
        const res = await fetch('http://localhost:3000/api/categorias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
        if (!res.ok) throw new Error('Erro ao criar categoria');
      }
      closeModal();
      fetchCategorias();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrapper>
      <h1>Gerenciar Categorias</h1>
      <Button onClick={openModalForCreate}>Adicionar Nova Categoria</Button>
      <ProductsGridWrapper>
        {categorias.map((cat) => (
          <div key={cat.id}>
            <div style={{
              background: '#fff',
              borderRadius: 8,
              padding: 16,
              minHeight: 80,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <strong style={{ color: '#5d53b3', fontSize: 18 }}>{cat.nome}</strong>
              <div className="button-div">
                <Button onClick={() => openModalForEdit(cat)}>Editar</Button>
                <Button onClick={() => handleDelete(cat.id)}>Deletar</Button>
              </div>
            </div>
          </div>
        ))}
      </ProductsGridWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <h2>{editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}</h2>
            <form onSubmit={handleSubmit}>
              <FormField>
                <label>Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </FormField>
              <FormActions>
                <Button type="submit">{editingCategoria ? 'Atualizar' : 'Criar'}</Button>
                <Button onClick={closeModal} type="button">
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

export default CategoriesCrud;