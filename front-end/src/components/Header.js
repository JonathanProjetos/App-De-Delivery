import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const redirectMyRequest = () => {
    const pedidos = navigate('/');
    return pedidos;
  };

  const redirectProducts = () => {
    const produtos = navigate();
    return produtos;
  };

  const redirectLogin = () => {
    const logOut = navigate();
    return logOut;
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testId="customer_products__element-navbar-link-products"
          onClick={ redirectProducts }
        >
          Produtos
        </button>
        <button
          type="button"
          data-testId="customer_products__element-navbar-link-orders"
          onClick={ redirectMyRequest }
        >
          Meus Pedidos
        </button>
      </div>
      <div>
        <div>
          <div>
            <p
              data-testId="customer_products__element-navbar-user-full-name"
            >
              {data.name}
            </p>
          </div>
          <button
            type="button"
            data-testId="customer_products__element-navbar-link-logout"
            onClick={ redirectLogin }
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
