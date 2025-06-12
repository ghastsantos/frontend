import React from 'react';
import Slider from 'react-slick'; // Importa o componente Slider
import { CarouselWrapper, SlideItem, SlideImage } from './styles';

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>Não há imagens para exibir no carrossel.</p>; // Feedback para o usuário
  }

  const settings = {
    dots: false,           // Mostrar pontos de navegação
    infinite: true,       // Loop infinito
    speed: 700,           // Velocidade da transição em ms
    slidesToShow: 1,      // Quantos slides mostrar por vez
    slidesToScroll: 1,    // Quantos slides rolar por vez
    autoplay: true,       // Ativar autoplay
    autoplaySpeed: 4000,  // Tempo entre slides no autoplay (ex: 4 segundos)
    pauseOnHover: true,   // Pausar autoplay ao passar o mouse
    adaptiveHeight: true, // Ajusta a altura do carrossel com base no slide atual
    draggable: false,
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

export default ImageCarousel;