import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem('name');
    setNameUser(storage);
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
    return products;
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ redirectProducts }
        >
          Produtos
        </button>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ redirectOrder }
        >
          Meus Pedidos
        </button>
      </div>
      <div>
        <div>
          <div>
            <p
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {nameUser}
            </p>
          </div>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logOut }
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
