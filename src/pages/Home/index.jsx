import React, { useState, useEffect } from 'react';
import { HomePageWrapper, ProductsGridWrapper } from './styles.js';
import ProductCard from '../../componets/ProductCard';
import ImageCarousel from '../../componets/ImageCarousel';
import Button from '../../componets/Button';
import DiscountCarousel from '../../componets/DiscountCarousel/index.jsx';
import { useNavigate } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext'; // Se você tiver um contexto de carrinho

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Certifique-se que seu backend está rodando na porta 3000
        const response = await fetch('http://localhost:3000/api/produtos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
  console.log('Produto adicionado:', product);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produto adicionado ao carrinho!');
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