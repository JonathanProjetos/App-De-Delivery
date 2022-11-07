import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// import { validLogin, setToken } from '../services/request';

function AcessProducts() {
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState(Boolean);
  const [roleUser, setUserRole] = useState('');

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token, role } = getToken;
    setUserRole(role);
    const requestValid = async () => {
      if (token) setCheckUser(true);
    };
    requestValid();
  }, [navigate]);

  const route = window.location.pathname === '/';
  console.log(checkUser);
  console.log(route);
  return (
    <div>
      { checkUser && route ? <Navigate to={ `/${roleUser}/products` } /> : null}
    </div>
  );
}

export default AcessProducts;
