import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrdersSeller from '../components/OrderSeller';
import HeaderSeller from '../components/HeaderSeller';
import { validLogin, setToken } from '../services/request';

function MeusPedidosSeller() {
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
      } catch (err) {
        console.error(err);
      }
    };
    requestValid();
  }, [navigate]);

  return (
    <div>
      { roleUser ? (
        <div>
          <HeaderSeller />
          <h1 className="subtitle">Lista de Pedidos</h1>
          <OrdersSeller role={ roleUser } />
        </div>
      ) : <p>Carregando...</p> }
    </div>
  );
}

export default MeusPedidosSeller;
