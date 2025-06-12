import styled from 'styled-components';

export const CartWrapper = styled.div`
  padding: 150px 40px 40px 40px;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;
`;

export const ProductsGridSingleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  justify-items: center;

  .option-div {
    display: flex;
    margin-top: 10px;
    gap: 10px;
    justify-content: center;
    width: 250px;
  }
`;

// Para 2 itens centralizados
export const ProductsGridDoubleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 15px;
  justify-content: center;
  padding: 20px 0;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  .option-div {
    display: flex;
    margin-top: 10px;
    gap: 10px;
    justify-content: center;
    width: 250px;
  }
`;


export const ProductsGridWrapper = styled.div`
  display: grid;
  justify-items: center;
  /* Usando a definição original de 5 colunas e adaptando para responsividade */
  grid-template-columns: repeat(3, 1fr); /* */
  gap: 20px 15px; /* Espaçamento vertical e horizontal */
  padding: 20px 0; /* Padding acima e abaixo da grade de produtos */

  @media (max-width: 1300px) { /* Ajuste para quando 5 colunas ficam muito apertadas */
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1024px) { /* Ajuste para tablets */
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 768px) { /* Telas menores / tablets em modo retrato */
    grid-template-columns: repeat(1, 1fr); /* (para 475px, adaptado) */
  }
  @media (max-width: 480px) { /* Celulares */
    grid-template-columns: 1fr; /* Uma coluna para melhor visualização */
    gap: 15px;
  }

  .option-div {
    display: flex;
    margin-top: 10px;
    gap: 10px;
    justify-content: center;
    width: 250px;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #232323;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Total = styled.h2`
  text-align: center;
  color: #5d53b3;
  margin-top: 30px;
`;

export const EmptyCart = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 60px;
`;

export const CheckoutForm = styled.form`
  background: #232323;
  padding: 32px 24px;
  border-radius: 12px;
  margin-top: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 12px #0002;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;

  label {
    font-weight: bold;
    margin-bottom: 6px;
    color: #f3f3f3;
  }

  input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #444;
    background: #181818;
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
  }

  input:focus {
    border: 1.5px solid #5d53b3;
  }
`;

export const SuccessMessage = styled.p`
  color: #4caf50;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 40px;
`;