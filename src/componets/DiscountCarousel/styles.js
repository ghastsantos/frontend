import styled from 'styled-components';

export const CarouselWrapper = styled.section`
  width: 100%;
  margin: 40px auto 20px auto; /* Margem superior e inferior como no original */

  /* Ajustes para os botões e dots do react-slick, se necessário */
  .slick-prev:before,
  .slick-next:before {
    color: #5d53b3; /* Cor das setas do carrossel, combine com seu tema */
    display: none;
  }

  .slick-dots li button:before {
    font-size: 10px;
    display: none;
    color: #5d53b3;
  }
  .slick-dots li.slick-active button:before {
    color: #5d53b3;
    display: none;
  }
`;

export const SlideItem = styled.div`
  outline: none; // Remove o outline padrão do slick-slider em alguns navegadores
  padding: 0 10px;  /* adiciona 10px de espaçamento nas laterais */
  a {
    display: block; // Garante que o link ocupe o espaço
  }
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 500px; /* Altura do carrossel como no seu CSS original */
  object-fit: cover; /* Ou 'contain', dependendo do resultado desejado */
  /* border-radius: 10px; // Opcional */
  /* box-shadow: 2px 2px 8px #8a8a8a; // Opcional */
`;