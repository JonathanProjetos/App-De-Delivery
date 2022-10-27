import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </Provider>
  );
}

export default App;
