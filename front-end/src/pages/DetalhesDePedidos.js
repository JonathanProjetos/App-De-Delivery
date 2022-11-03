import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { validLogin } from '../services/request';

function DetalhesPedidos() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const loggedUser = JSON.parse(localStorage?.getItem('user')) || navigate('/login');
      const validToken = await validLogin('/login/validate');
      if (validToken) {
        setUser(loggedUser);
      } else {
        navigate('/login');
      }
    })();
  }, [navigate]);

  return (
    <div>
      { user ? (
        <div>
          <Header />
        </div>
      ) : <p>Carregando...</p> }
    </div>
  );
}

export default DetalhesPedidos;
