import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import DeliveryProvider from './context/Provider';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MeusPedidos from './pages/MeusPedidos';
import Produtos from './pages/Produtos';
import Gerenciamento from './pages/Gerenciamento';
import DetalhesPedido from './pages/DetalhesDePedidos';

function App() {
  return (
    <DeliveryProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/admin/manage" element={ <Gerenciamento /> } />
        <Route exact path="/register" element={ <Cadastro /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/customer/orders" element={ <MeusPedidos /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/products" element={ <Produtos /> } />
        <Route exact path="customer/orders/:id" element={ <DetalhesPedido /> } />
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
