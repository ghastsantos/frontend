// frontend/src/pages/HomePage.styles.js
import styled from 'styled-components';

export const HomePageWrapper = styled.main`
  padding: 40px 40px 40px; /* Adiciona padding lateral e inferior */
  max-width: 1600px; /* Limita a largura máxima do conteúdo principal */
  margin: 0 auto; /* Centraliza o conteúdo */

  h1 {
    font-size: 2.5em; 
    margin: 40px 0 30px 0; /* Margem antes e depois do título */
    color: #d0d5da; /* */
    text-align: center;
  }
`;

export const ProductsGridWrapper = styled.div`
  display: grid;
  /* Usando a definição original de 5 colunas e adaptando para responsividade */
  grid-template-columns: repeat(5, 1fr); /* */
  gap: 20px 15px; /* Espaçamento vertical e horizontal */
  padding: 20px 0; /* Padding acima e abaixo da grade de produtos */

  @media (max-width: 1300px) { /* Ajuste para quando 5 colunas ficam muito apertadas */
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1024px) { /* Ajuste para tablets */
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) { /* Telas menores / tablets em modo retrato */
    grid-template-columns: repeat(2, 1fr); /* (para 475px, adaptado) */
  }
  @media (max-width: 480px) { /* Celulares */
    grid-template-columns: 1fr; /* Uma coluna para melhor visualização */
    gap: 15px;
  }
`;