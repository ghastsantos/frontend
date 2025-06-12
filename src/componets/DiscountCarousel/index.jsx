import React from 'react';
import Slider from 'react-slick'; // Importa o componente Slider
import { CarouselWrapper, SlideItem, SlideImage } from './styles';

const DiscountCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>Não há imagens para exibir no carrossel.</p>; // Feedback para o usuário
  }

  const settings = {
    infinite: true,
    arrows: false,
    dots: false,    
    draggable: false,       
    slidesToShow: 3,      // Quantos slides mostrar por vez
    pauseOnHover: true,   // Pausar autoplay ao passar o mouse
    adaptiveHeight: true, // Ajusta a altura do carrossel com base no slide atual
    // Você pode adicionar mais configurações aqui conforme a documentação do react-slick
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {images.map((image, index) => (
          <SlideItem key={index}>
            <a href={image.link || '#'}>
              <SlideImage src={image.src} alt={image.alt} />
            </a>
          </SlideItem>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default DiscountCarousel;