import React, { useState, useEffect } from 'react';
import { HomePageWrapper, ProductsGridWrapper } from './styles.js';
import ProductCard from '../../componets/ProductCard';
import ImageCarousel from '../../componets/ImageCarousel';
import Button from '../../componets/Button';
import DiscountCarousel from '../../componets/DiscountCarousel/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Certifique-se que seu backend está rodando na porta 3000
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/produtos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Exemplo: pegar os 10 primeiros produtos ou os mais recentes
        setProducts(data.slice(0, 10));
      } catch (error) {
        console.error("Falha ao buscar produtos:", error);
        // Adicionar um estado de erro para mostrar ao usuário seria uma boa prática
      }
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
    // Se quiser, pode mostrar um toast ou snackbar aqui
  };

  // Imagens para o carrossel (certifique-se que estão na pasta public/images)
  const carouselImages = [
    { src: '../../../src/assets/banner1.png', alt: 'Banner Palmeiras 1', link: '#' },
    { src: '../../../src/assets/banner2.png', alt: 'Banner Palmeiras 2', link: '#' },
    // Adicione mais imagens se desejar
  ];

  const discountImages = [
    { src: '../../../src/assets/item1.png', alt: 'Item 1', link: '#' },
    { src: '../../../src/assets/item2.png', alt: 'Item 2', link: '#' },
    { src: '../../../src/assets/item3.png', alt: 'Item 3', link: '#' },
  ];

  const novidades = [...products]
  .sort((a, b) => b.ano - a.ano)
  .slice(0, 10);

  const maisVendidos = products.slice(0, 10);

  return (
    <HomePageWrapper>
      <ImageCarousel images={carouselImages} />
      <h1>Novidades na área!</h1>
      {novidades.length > 0 ? (
        <ProductsGridWrapper>
          {novidades.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </ProductsGridWrapper>
      ) : (
        <p>Carregando produtos...</p> // Ou uma mensagem de "Nenhum produto encontrado"
      )}
      <DiscountCarousel images={discountImages} />
      <h1>Comemore o Mundial de Clubes!</h1>
      {maisVendidos.length > 0 ? (
        <ProductsGridWrapper>
          {maisVendidos.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </ProductsGridWrapper>
      ) : (
        <p>Carregando produtos...</p>
      )}
    </HomePageWrapper>
  );
};

export default HomePage;