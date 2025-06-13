import React, { useEffect, useState } from 'react';
import { PageWrapper, ProductsGridWrapper } from './styles';
import ProductCard from '../../componets/ProductCard';
import { useCart } from '../../Contexts/CartContext';

const REGATAS_CATEGORIA_ID = 2; // Troque pelo ID real de "Regatas"

const Regatas = () => {
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
      setProducts(
        data.filter(
          p => Array.isArray(p.categorias) && p.categorias.includes(REGATAS_CATEGORIA_ID)
        )
      );
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
      <h1>Regatas</h1>
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

export default Regatas;