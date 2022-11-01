import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
      </Routes>
    </Provider>
  );
}

export default App;
