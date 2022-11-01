import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken, validLogin } from '../services/request';
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
        setToken(token);
        const validToken = await validLogin('/login/validate');
        if (validToken.message !== 'ok') {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const loginValidate = async () => {
      try {
        // const token = localStorage.getItem('token');
        // const validate = await requestLogin('/login/validate', { token });
        // if (!validate) {
        //   navigate('/login');
        // }
        const data = await requestData('/customer/products');
        // data.forEach((product) => {
        //   product.quantity = 0;
        // });
        setProducts(data);
      } catch (error) {
        // navigate('/login');
        console.log(error);
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
        onClick={ () => navigate('/customer/checkout') }
        datatest-id="customer_products__checkout-bottom-value"
      >
        VER CARRINHO :
        R$
        {' '}
        {total}
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
