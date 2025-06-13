import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../componets/Button';
import { useCart } from '../../Contexts/CartContext';
import {
  CartWrapper,
  Total,
  EmptyCart,
  ProductsGridSingleWrapper,
  ProductsGridDoubleWrapper,
  ProductsGridWrapper,
  CheckoutForm,
  FormField,
  SuccessMessage
} from './styles';
import ProductCard from '../../componets/ProductCard';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ nome: '', email: '', endereco: '' });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const [formErrors, setFormErrors] = useState({});
  const { updateCartCount } = useCart();

  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(stored);
    };
    loadCart();
    window.addEventListener('focus', loadCart);
    return () => window.removeEventListener('focus', loadCart);
  }, [location]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    setTimeout(updateCartCount, 0); // Garante atualização após o setCart
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setTimeout(updateCartCount, 0);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.preco) * item.quantity, 0);

  const handleInputChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const errors = {};
    if (!checkoutData.nome.trim()) errors.nome = 'Preencha o nome';
    if (!checkoutData.email.trim()) errors.email = 'Preencha o email';
    if (!checkoutData.endereco.trim()) errors.endereco = 'Preencha o endereço';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setCheckoutSuccess(true);
    localStorage.removeItem('cart');
    setCart([]);
    updateCartCount();
  };

  if (cart.length === 0) {
    return (
      <CartWrapper>
        <h1>Seu Carrinho</h1>
        {checkoutSuccess ? (
          <SuccessMessage>Compra finalizada com sucesso!</SuccessMessage>
        ) : (
          <EmptyCart>O carrinho está vazio.</EmptyCart>
        )}
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <h1 style={{ textAlign: 'center'}}>Seu Carrinho</h1>
      {cart.length === 1 ? (
        <ProductsGridSingleWrapper>
          {cart.map(item => (
          <div key={item.id} style={{ position: 'relative', marginBottom: 24 }}>
            <ProductCard product={item} showAddToCartButton={false} />
            <div className="option-div">
              <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Quantidade: {item.quantity}
              </span>
              <Button small onClick={() => updateQuantity(item.id, -1)}>-</Button>
              <Button small onClick={() => updateQuantity(item.id, 1)}>+</Button>
              <Button small onClick={() => removeItem(item.id)}>Remover</Button>
            </div>
          </div>
        ))}
        </ProductsGridSingleWrapper>
      ) : cart.length === 2 ? (
        <ProductsGridDoubleWrapper>
          {cart.map(item => (
          <div key={item.id} style={{ position: 'relative', marginBottom: 24 }}>
            <ProductCard product={item} showAddToCartButton={false} />
            <div className="option-div">
              <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Quantidade: {item.quantity}
              </span>
              <Button small onClick={() => updateQuantity(item.id, -1)}>-</Button>
              <Button small onClick={() => updateQuantity(item.id, 1)}>+</Button>
              <Button small onClick={() => removeItem(item.id)}>Remover</Button>
            </div>
          </div>
        ))}
        </ProductsGridDoubleWrapper>
      ) : (
      <ProductsGridWrapper>
        {cart.map(item => (
          <div key={item.id} style={{ position: 'relative', marginBottom: 24 }}>
            <ProductCard product={item} showAddToCartButton={false} />
            <div className="option-div">
              <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Quantidade: {item.quantity}
              </span>
              <Button small onClick={() => updateQuantity(item.id, -1)}>-</Button>
              <Button small onClick={() => updateQuantity(item.id, 1)}>+</Button>
              <Button small onClick={() => removeItem(item.id)}>Remover</Button>
            </div>
          </div>
        ))}
      </ProductsGridWrapper>
      )}
      <Total>Total: R$ {total.toFixed(2)}</Total>

      <CheckoutForm onSubmit={handleCheckout}>
        <h2>Finalizar Compra</h2>
        <FormField>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={checkoutData.nome}
            error={!!formErrors.nome}
            style={formErrors.nome ? { border: '1.5px solid #e74c3c' } : {}}
            onChange={handleInputChange}
          />
          {formErrors.nome && <span style={{ color: '#e74c3c', fontSize: 13 }}>{formErrors.nome}</span>}
        </FormField>
        <FormField>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={checkoutData.email}
            error={!!formErrors.email}
            style={formErrors.email ? { border: '1.5px solid #e74c3c' } : {}}
            onChange={handleInputChange}
          />
          {formErrors.email && <span style={{ color: '#e74c3c', fontSize: 13 }}>{formErrors.email}</span>}
        </FormField>
        <FormField>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={checkoutData.endereco}
            error={!!formErrors.endereco}
            style={formErrors.endereco ? { border: '1.5px solid #e74c3c' } : {}}
            onChange={handleInputChange}
          />
          {formErrors.endereco && <span style={{ color: '#e74c3c', fontSize: 13 }}>{formErrors.endereco}</span>}
        </FormField>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0' }}>
          <img
            src="../../../src/assets/qrCode.png"
            alt="QR Code para pagamento"
            style={{ width: 180, height: 180, borderRadius: 12, background: '#fff', padding: 8, boxShadow: '0 2px 8px #0002' }}
          />
          <span style={{ color: '#f3f3f3', marginTop: 8, fontSize: 14 }}>Escaneie para pagar via Pix</span>
        </div>
        <Button primary type="submit" style={{ marginTop: 12 }}>
          Finalizar Compra
        </Button>
      </CheckoutForm>
    </CartWrapper>
  );
};

export default Cart;