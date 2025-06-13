import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Header from './componets/Header';
import Footer from './componets/Footer';
import HomePage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductsCrud from './pages/ProductsCrud';
import UsersCrud from './pages/UsersCrud';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import CamisasMasculinas from './pages/CamisasMasculinas';
import CamisasFemininas from './pages/CamisasFemininas';
import Regatas from './pages/Regatas';
import Casacos from './pages/Casacos';
import CategoriesCrud from './pages/CategoriesCrud';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './Contexts/CartContext';

// Função para verificar se o usuário está autenticado (exemplo)
const isAuthenticated = () => {
  return !!localStorage.getItem('id');
};

const AdminRoute = ({ children }) => {
  const userId = localStorage.getItem('id');
  if (!userId || userId !== '1') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Layout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/cadastro';
  const hideFooter = location.pathname === '/login' || location.pathname === '/cadastro';
  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/camisas-masculinas" element={<CamisasMasculinas />} />
            <Route path="/camisas-femininas" element={<CamisasFemininas />} />
            <Route path="/regatas" element={<Regatas />} />
            <Route path="/casacos" element={<Casacos />} />
            <Route
              path="/produtos"
              element={
                <AdminRoute>
                  <ProductsCrud />
                </AdminRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <AdminRoute>
                  <UsersCrud />
                </AdminRoute>
              }
            />
            <Route
              path="/categorias"
              element={
                <AdminRoute>
                  <CategoriesCrud />
                </AdminRoute>
              }
            />
            <Route
              path="/carrinho"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;