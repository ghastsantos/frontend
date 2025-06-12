import styled from 'styled-components';

export const PageWrapper = styled.main`
  padding: 40px 40px 40px;
  max-width: 1600px;
  margin: 0 auto;
  h1 {
    font-size: 2.5em;
    margin: 40px 0 30px 0;
    color: #d0d5da;
    text-align: center;
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
`;