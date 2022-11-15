import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

function Produtos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [updateTotal, setUpdateTotal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const requestValid = async () => {
      try {
        api.setToken(token);
        const validToken = await api.validLogin('/login/validate');
        if (!validToken) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
      } catch (err) {
        // console.error(err);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const data = await api.requestData('/customer/products');
        setProducts(data);
      } catch (err) {
        // console.error(err);
      }
    };
    loginValidate();
  }, []);

  useEffect(() => {
    if (updateTotal) {
      const totalCart = JSON.parse(localStorage.getItem('total'));
      setTotal(totalCart);
    }
    setUpdateTotal(false);
  }, [updateTotal]);

  return (
    <section>
      <Header />
      <button
        type="button"
        disabled={ total === 0 }
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        className="btn-product"
      >
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          {total.toString().replace('.', ',')}
        </span>
      </button>
      <div className="container-products">
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
            setUpdateTotal={ setUpdateTotal }
          />
        ))}
      </div>
    </section>
  );
}

export default Produtos;
