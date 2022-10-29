import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem('name');
    setNameUser(storage);
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testId="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/costumer/products') }
        >
          Produtos
        </button>
        <button
          type="button"
          data-testId="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/costumer/orders') }
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
              {nameUser}
            </p>
          </div>
          <button
            type="button"
            data-testId="customer_products__element-navbar-link-logout"
            onClick={ () => navigate('/login') }
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
