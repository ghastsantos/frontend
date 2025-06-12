// frontend/src/pages/ProdutosPage.styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 150px 40px 40px 40px; // <-- padding-top maior para evitar sobreposição do header
  max-width: 1600px;
  margin: 0 auto;

  h1{
    margin-bottom: 20px;
    color: #5d53b3;
  }


`;

export const ProductsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 15px;
  padding: 20px 0;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .button-div {
    display: flex;
    margin-top: 10px;
    gap: 10px;
    flex-direction: column;
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 300px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
`;

export const FormField = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
