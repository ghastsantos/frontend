import { useNavigate } from 'react-router-dom'; // Usar NavLink para links de menu ativos
import Button from '../Button'; // Importa nosso componente Button
import { MdShoppingCart, MdPerson, MdSearch } from 'react-icons/md';
import { useCart } from '../../Contexts/CartContext';

// Importando os componentes estilizados
import {
  HeaderContainer,
  Nav,
  LogoLink,
  SearchForm,
  SearchInput,
  MenuContainer,
  MenuItem,
  MenuLink,
  IconsContainer,
} from './styles'; 

// Importe suas imagens
import logoImg from '../../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    if (searchTerm) {
      alert(`Buscando por: ${searchTerm}`);
      // navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <LogoLink to="/">
          <img src={logoImg} alt="GBC Sports Logo" />
        </LogoLink>

        <SearchForm onSubmit={handleSearch}>
          <SearchInput type="text" name="search" placeholder="Pesquisar..." />
          <Button type="submit" iconButton aria-label="Buscar">
            <MdSearch size={24} />
          </Button>
        </SearchForm>

        <MenuContainer>
          <MenuItem><MenuLink to="/" end>Início</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/camisas-masculinas">Camisas Masculinas</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/camisas-femininas">Camisas Femininas</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/regatas">Regatas</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/casacos">Casacos</MenuLink></MenuItem>
        </MenuContainer>
        <IconsContainer>
          <Button iconButton onClick={() => navigate('/carrinho')} aria-label="Carrinho">
            <MdShoppingCart size={32} />
            {cartCount > 0 && (
              <span style={{
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                fontSize: 12,
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Button>
          <Button iconButton onClick={() => navigate('/perfil')} aria-label="Perfil do usuário">
            <MdPerson size={32} />
          </Button>
        </IconsContainer>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;