import React, { useState, useEffect } from 'react';
import {
  PageWrapper,
  ProductsGridWrapper,
  ModalOverlay,
  ModalContainer,
  FormField,
  FormActions,
} from './styles';
import ProductCard from '../../componets/ProductCard';
import Button from '../../componets/Button';

const ProductsCrud = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    preco: '',
    ano: '',
    ativo: false,
    imagem: null,
    genero: 'masculino',
  });
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/produtos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Falha ao carregar produtos');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

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
    setEditingProduct(null);
    setFormValues({
      nome: '',
      preco: '',
      ano: '',
      ativo: false,
      imagem: null,
      genero: 'masculino',
    });
    setSelectedCategorias([]);
    setIsModalOpen(true);
  };

  const openModalForEdit = (product) => {
    setEditingProduct(product);
    setFormValues({
      nome: product.nome,
      preco: product.preco,
      ano: product.ano,
      ativo: product.ativo,
      imagem: null,
      genero: product.genero,
    });
    // product.categorias pode ser array de ids ou array de objetos {id, nome}
    setSelectedCategorias(
      Array.isArray(product.categorias)
        ? product.categorias.map(cat => (typeof cat === 'object' ? cat.id : cat))
        : []
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/produtos/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        fetchProducts();
      } else {
        console.error('Erro ao deletar produto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormValues((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormValues((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // PUT (edição) - sem imagem
        const res = await fetch(`http://localhost:3000/api/produtos/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: formValues.nome,
            preco: formValues.preco,
            ano: formValues.ano,
            ativo: formValues.ativo,
            genero: formValues.genero,
            categorias: JSON.stringify(selectedCategorias),
          }),
        });
        if (!res.ok) throw new Error('Erro ao atualizar produto');
      } else {
        // POST (criação) - com imagem
        const formData = new FormData();
        formData.append('nome', formValues.nome);
        formData.append('preco', formValues.preco);
        formData.append('ano', formValues.ano);
        formData.append('ativo', formValues.ativo);
        if (formValues.imagem) {
          formData.append('imagem', formValues.imagem);
        }
        formData.append('genero', formValues.genero);
        formData.append('categorias', JSON.stringify(selectedCategorias));

        const res = await fetch('http://localhost:3000/api/produtos', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Erro ao criar produto');
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrapper>
      <h1>Gerenciar Produtos</h1>
      <Button onClick={openModalForCreate}>Adicionar Novo Produto</Button>
      <ProductsGridWrapper>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={() => {}} />
            <div className="button-div">
              <Button onClick={() => openModalForEdit(product)}>Editar</Button>
              <Button onClick={() => handleDelete(product.id)}>Deletar</Button>
            </div>
          </div>
        ))}
      </ProductsGridWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
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
                <label>Preço</label>
                <input
                  type="number"
                  step="0.01"
                  name="preco"
                  value={formValues.preco}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Ano</label>
                <input
                  type="number"
                  name="ano"
                  value={formValues.ano}
                  onChange={handleFormChange}
                  required
                />
              </FormField>
              <FormField>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Ativo</label>
                  <input
                    type="checkbox"
                    name="ativo"
                    checked={formValues.ativo}
                    onChange={handleFormChange}
                  />
                </div>
              </FormField>
              <FormField>
                <label>Imagem</label>
                <input type="file" name="imagem" onChange={handleFormChange} />
              </FormField>
              <FormField>
                <label>Gênero</label>
                <select name="genero" value={formValues.genero} onChange={handleFormChange}>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </FormField>
              <FormField>
                <label>Categorias</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {categorias.map(cat => (
                    <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        type="checkbox"
                        value={cat.id}
                        checked={selectedCategorias.includes(cat.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedCategorias(prev => [...prev, cat.id]);
                          } else {
                            setSelectedCategorias(prev => prev.filter(id => id !== cat.id));
                          }
                        }}
                      />
                      {cat.nome}
                    </label>
                  ))}
                </div>
              </FormField>
              <FormActions>
                <Button type="submit">{editingProduct ? 'Atualizar' : 'Criar'}</Button>
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

export default ProductsCrud;