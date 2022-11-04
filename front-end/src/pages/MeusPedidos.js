import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Orders from '../components/Orders';
import Header from '../components/Header';
import { validLogin, setToken } from '../services/request';

function MeusPedidos() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    setUser(getToken);
    const requestValid = async () => {
      try {
        setToken(token);
        const validToken = await validLogin('/login/validate');
        if (!validToken) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestValid();
  }, [navigate]);

  return (
    <div>
      { user ? (
        <div>
          <Header />
          <Orders role={ user.role } />
        </div>
      ) : <p>Carregando...</p> }
    </div>
  );
}

export default MeusPedidos;
