// frontend/src/components/Header.styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  min-height: 80px;
  padding: 8px 60px;
  background-color: #1a1a1a;
  color: #5d53b3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LogoLink = styled(Link)`
  display: inline-block; // Para garantir que o link se comporte bem com a imagem
  img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background-color: #fffefe;
  height: 35px;
  border-radius: 40px;
  padding: 5px 5px 5px 15px; /* Ajuste para alinhar o botão de ícone */

  /* Para o botão de busca dentro do SearchForm */
  button {
    padding: 5px; /* Ajuste o padding do botão de busca */
    margin-left: 5px; /* Espaço entre input e botão */
    color: #1a1a1a; /* Cor do ícone de busca */
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const SearchInput = styled.input`
  border: none;
  background-color: transparent; /* Input transparente dentro do form branco */
  outline: none;
  padding: 0 5px;
  font-size: 16px;
  line-height: 25px;
  width: 200px;
  color: #333; /* Cor do texto do input */
  transition: width 0.4s;

  &:focus {
    width: 300px;
  }
`;

export const MenuContainer = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li``;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: rgb(243, 239, 239);
  font-weight: 500;
  font-size: 18px;

  &:hover,
  &.active { /* Adicione a classe 'active' via NavLink se quiser destacar a rota atual */
    color: #5d53b3;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Espaço entre os ícones de carrinho e perfil */
`;

export const IconLink = styled(Link)`
   img {
    width: 40px;
    height: 40px;
   }
`;

export const ProfileIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  img {
    width: 40px;
    height: 40px;
  }
`;