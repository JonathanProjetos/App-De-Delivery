import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Orders from '../components/Orders';
import Header from '../components/Header';
import { validLogin, setToken } from '../services/request';

function MeusPedidosCostumer() {
  const [roleUser, setUserRole] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token, role } = getToken;
    setUserRole(role);
    const requestValid = async () => {
      try {
        setToken(token);
        const validToken = await validLogin('/login/validate');
        if (!validToken) {
          localStorage.setItem('user', '');
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
      { roleUser ? (
        <div>
          <Header />
          <Orders role={ roleUser } />
        </div>
      ) : <p>Carregando...</p> }
    </div>
  );
}

export default MeusPedidosCostumer;
