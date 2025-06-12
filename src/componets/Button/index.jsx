import React from 'react';
import styled, { css } from 'styled-components';

// Definindo os estilos base do botão
const StyledButton = styled.button`
  font-family: "Bebas Neue", sans-serif; /* Exemplo de fonte, ajuste conforme seu design */
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; /* Tamanho de fonte base */
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Espaço entre o texto e o ícone, se houver */
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

  /* Estilos padrão (pode ser o "secundário" ou um neutro) */
  background-color: #5d53b3; /* Cor roxa principal do seu design */
  color: #fff;
  border: 2px solid #5d53b3;

  &:hover {
    background-color: #4a429b; /* Um tom mais escuro de roxo */
    border-color: #4a429b;
    transform: translateY(-1px); /* Leve elevação no hover */
  }

  &:active {
    transform: translateY(0px);
  }

  /* Adicionando variantes com props */
  ${(props) =>
    props.primary && // Se a prop 'primary' for passada
    css`
      background-color: #5d53b3;
      color: #ffffff;
      border: 2px solid #5d53b3;

      &:hover {
        background-color: #4a429b;
        border-color: #4a429b;
      }
    `}

  ${(props) =>
    props.secondary && // Se a prop 'secondary' for passada
    css`
      background-color: transparent;
      color: #5d53b3;
      border: 2px solid #5d53b3;

      &:hover {
        background-color: rgba(93, 83, 179, 0.1); /* Leve fundo roxo */
        color: #4a429b;
      }
    `}

  ${(props) =>
    props.iconButton && // Para botões que são apenas ícones
    css`
      background-color: transparent;
      border: none;
      padding: 8px; /* Ajuste o padding para botões de ícone */
      border-radius: 50%; /* Deixa redondo se for só um ícone */
      color: #f3f3f3; /* Cor do ícone */

      &:hover {
        background-color: rgba(255, 255, 255, 0.1); /* Leve destaque no hover */
        color: #5d53b3;
      }
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 0.875rem;
      padding: 6px 12px;
    `}

  /* Desabilitado */
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    border-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ children, onClick, type = 'button', primary, secondary, iconButton, small, disabled, ...props }) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      iconButton={iconButton}
      small={small}
      disabled={disabled}
      {...props} // Passa outras props como 'className' se necessário
    >
      {children}
    </StyledButton>
  );
};

export default Button;