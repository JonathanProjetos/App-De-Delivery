import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderSeller() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    const { name } = storage;
    setNameUser(name);
  }, []);

  const redirectOrder = () => {
    const products = navigate('/seller/orders');
    return products;
  };

  const logOut = () => {
    const products = navigate('/login');
    localStorage.setItem('user', '');
    return products;
  };

  return (
    <div className="product-container">
      <p
        data-testid="customer_products__element-navbar-user-full-name"
        className="client-name"
      >
        {nameUser}
      </p>
      <div className="btn-container">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ redirectOrder }
          className="btn-product"
        >
          Pedidos
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logOut }
          className="btn-exit"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default HeaderSeller;
