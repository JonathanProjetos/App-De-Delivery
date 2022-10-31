import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function ProductCard({ product }) {
  const { cart, setCart } = useContext(Context);
  const [productCard, setProductCard] = useState(product);
  const total = JSON.parse(localStorage.getItem('total'));

  const incrementar = async () => {
    try {
      const { price, quantity } = productCard;
      const quantityUpdate = productCard.quantity === 0 ? 1 : productCard.quantity + 1;
      // setQuantity((prevQuantity) => prevQuantity + 1);
      setProductCard((prev) => ({
        ...prev,
        quantity: quantityUpdate,
      }));
      const oldCart = cart.filter((item) => item.id !== productCard.id);
      setCart([...oldCart, { ...productCard }]);
      localStorage.setItem('total', JSON.stringify(total + (quantity * Number(price))));
      localStorage.setItem('cart', JSON.stringify([...oldCart, { ...productCard }]));
      const test = JSON.parse(localStorage.getItem('cart'));
      // console.log(test);
      console.log(test);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementar = () => {
    const quantityUpdate = productCard.quantity === 1 ? 0 : productCard.quantity - 1;
    setProductCard((prev) => ({
      ...prev,
      quantity: quantityUpdate,
    }));
    const { price, quantity } = productCard;
    const oldCart = cart.filter((item) => item.id !== productCard.id);
    setCart([...oldCart, { ...productCard }]);
    localStorage.setItem('total', JSON.stringify(total - (quantity * Number(price))));
    localStorage.setItem('cart', JSON.stringify([...oldCart, { ...productCard }]));
    if (productCard.quantity === 0) {
      const newCart = cart.filter((item) => item.id !== productCard.id);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  return (
    <section>
      <div>
        <div key={ productCard.id }>
          <p
            name={ productCard.name }
            datatest-id={ `customer_products__element-card-title-${productCard.id}` }
          >
            {productCard.name}
          </p>
          <p
            name={ productCard.name }
            datatest-id={ `customer_products__element-card-price-${productCard.id}` }
          >
            {productCard.price}
          </p>
          <img
            name={ productCard.name }
            datatest-id={ `customer_products__img-card-bg-image-${productCard.id}` }
            src={ productCard.url_image }
            alt={ productCard.name }
          />
          <button
            type="button"
            disabled={ productCard.quantity === 0 }
            data-testid={ `customer_products__button-card-rm-item-${productCard.id}` }
            name={ productCard.name }
            value={ productCard.price }
            onClick={ decrementar }
          >
            -
          </button>
          <p
            data-testid={ `customer_products__button-card-rm-item-${productCard.id}` }
            name={ productCard.name }
          >
            {productCard.quantity}

          </p>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${productCard.id}` }
            name={ productCard.name }
            value={ productCard.price }
            onClick={ incrementar }
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
