import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Produtos from './pages/Produtos';

function App() {
  return (
    <Provider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/customer/products" element={ <Produtos /> } />
      </Routes>
    </Provider>
  );
}

export default App;
