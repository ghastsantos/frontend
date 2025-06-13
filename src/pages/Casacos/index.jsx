import React, { useEffect, useState } from 'react';
import { PageWrapper, ProductsGridWrapper } from './styles';
import ProductCard from '../../componets/ProductCard';
import { useCart } from '../../Contexts/CartContext';

const CASACOS_CATEGORIA_ID = 3; // Troque pelo ID real da categoria "Casacos" no seu banco

const Casacos = () => {
  const [products, setProducts] = useState([]);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/produtos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      // Supondo que cada produto tem um array de categorias (ex: [1,3])
      setProducts(data.filter(p => Array.isArray(p.categorias) && p.categorias.includes(CASACOS_CATEGORIA_ID)));
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Atualiza a bolinha!
  };

  return (
    <PageWrapper>
      <h1>Casacos</h1>
      <ProductsGridWrapper>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ProductsGridWrapper>
    </PageWrapper>
  );
};

export default Casacos;