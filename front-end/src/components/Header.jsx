import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from '../css/style.css';

function Header() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    const { name } = storage;
    setNameUser(name);
  }, []);

  const redirectProducts = () => {
    const products = navigate('/customer/products');
    return products;
  };

  const redirectOrder = () => {
    const products = navigate('/customer/orders');
    return products;
  };

  const logOut = () => {
    const products = navigate('/login');
    localStorage.setItem('user', '');
    return products;
  };

  return (
    <div style={ css } className="product-container">
      <p
        data-testid="customer_products__element-navbar-user-full-name"
        className="client-name"
      >
        {nameUser}
      </p>
      <div style={ css } className="btn-container">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ redirectProducts }
          className="btn-product"
        >
          Produtos
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ redirectOrder }
          className="btn-product"
        >
          Meus Pedidos
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
      <div />
    </div>
  );
}

export default Header;
