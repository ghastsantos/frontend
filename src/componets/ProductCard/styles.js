// frontend/src/components/ProductCard.styles.js
import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ddd; /* */
  border-radius: 10px; /* */
  box-shadow: 2px 2px 8px #4b4848; /* */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* */
  text-align: center;
  padding: 15px; /* Ajustado */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px; /* */
  background-color: #1f1f1f; /* Um fundo para o card, ajuste se necessário */

  &:hover {
    transform: translateY(-5px) scale(1.05); /* */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* */
  }

  img {
    width: 100%;
    max-height: 200px; /* */
    object-fit: cover;
    border-radius: 10px; /* Mudado de 20px para consistência */
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.2em; /* Ajustado */
    color: #d0d5da; /* */
    margin: 8px 0; /* Ajustado */
    font-family: 'Bebas Neue', sans-serif; /* */
  }

  .product-meta {
    display: flex;
    justify-content: center;
    gap: 15px;
    font-size: 1em;
    color: #a0a0a0; /* Cor mais suave para metadados */
    margin-bottom: 8px;
    font-family: 'Bebas Neue', sans-serif;
    h2 { /* Estilo para ano e gênero dentro de product-meta */
      font-size: 1em;
      color: #a0a0a0;
      margin: 0;
    }
  }

  h3 { /* Preço */
    font-size: 1.3em; /* Ajustado */
    color: #5d53b3; /* */
    margin: 10px 0;
    font-family: 'Bebas Neue', sans-serif; /* */
  }

  /* O botão será nosso componente Button, estilizado por suas props */
  button {
    margin-top: 10px;
  }
`;