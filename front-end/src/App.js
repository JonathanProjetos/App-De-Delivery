import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import MeusPedidos from './pages/MeusPedidos';
import Gerenciamento from './pages/Gerenciamento';

function App() {
  return (
    <Provider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/costumer/products" element={ <Produtos /> } />
        <Route exact path="/costumer/orders" element={ <MeusPedidos /> } />
        <Route exact path="/administrador/manager" element={ <Gerenciamento /> } />
      </Routes>
    </Provider>
  );
}

export default App;
