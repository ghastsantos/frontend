// frontend/src/pages/UsuariosPage.styles.js
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

export const UsersGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  gap: 10px;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 350px;
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