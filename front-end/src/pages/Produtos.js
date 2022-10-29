import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, requestLogin } from '../services/request';

function Produtos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const token = localStorage.getItem('token');
        const validate = await requestLogin('/login/validate', { token });
        if (!validate) {
          navigate('/login');
        }
        const data = await requestData('/customer/products');
        setProducts(data);
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };
    loginValidate();
  }, [navigate]);
  return (
    <section>
      <div>
        {products.map((product) => (
          <div key={ product.id }>
            <p
              datatest-id={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}
            </p>
            <p
              datatest-id={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price}
            </p>
            <img
              datatest-id={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
            />
            <p>
              {!product.quantity ? 0 : product.quantity}

            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Produtos;
