import Button from '../Button';
import { CardContainer } from './styles';

const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ProductCard = ({ product, handleAddToCart, showAddToCartButton = true }) => {
  if (!product) return null;

  return (
    <CardContainer>
      <img
        src={product.imagem ? `data:image/jpeg;base64,${product.imagem}` : 'caminho/para/imagem/padrao.png'}
        alt={product.nome}
      />
      <h2>{product.nome}</h2>
      <div className="product-meta">
        <h2>{product.ano}</h2>
      </div>
      <h3>R$ {formatPrice(product.preco)}</h3>
      {showAddToCartButton && (
        <Button primary onClick={() => handleAddToCart && handleAddToCart(product)}>
          Adicionar ao Carrinho
        </Button>
      )}
    </CardContainer>
  );
};

export default ProductCard;