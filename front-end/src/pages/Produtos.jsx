import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken, validLogin } from '../services/request';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import css from '../css/style.css';

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

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const data = await requestData('/customer/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
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
    <section style={ css } className="container">
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
      <div>
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
