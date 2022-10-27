import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/register" element={ <Cadastro /> } />
      </Routes>
    </Provider>
  );
}

export default App;
