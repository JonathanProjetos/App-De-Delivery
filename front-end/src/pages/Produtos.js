import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/request';
import ProductCard from '../components/ProductCard';

function Produtos() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  return (
    <section>
      <div>
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
            // setProducts={ setProducts }
          />
        ))}
      </div>
    </section>
  );
}

export default Produtos;
