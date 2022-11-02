import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function ProductCard({ product, setUpdateTotal }) {
  const { cart, setCart } = useContext(Context);
  const [productCard, setProductCard] = useState(product);
  const [quantityState, setQuantityState] = useState(0);
  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      const totalValue = cart.reduce((
        acc,
        { price, quantity },
      ) => acc + (price * quantity), 0).toFixed(2);
      localStorage.setItem('total', totalValue);
    }
  }, [cart]);

  const handleChange = ({ target: { value } }) => {
    if (Number(value) > 0) {
      setQuantityState(Number(value));
      setProductCard({ ...productCard, quantity: Number(value) });
      const oldCart = cart.filter((item) => item.id !== productCard.id);
      setCart([...oldCart, { ...productCard, quantity: Number(value) }]);
      const test = [...oldCart, { ...productCard, quantity: Number(value) }];
      localStorage.setItem('cart', JSON.stringify(test));
      setUpdateTotal(true);
    } else {
      // setQuantityState(0)
    }
  };

  const incrementar = () => {
    try {
      const { quantity } = productCard;
      const quantityUpdate = quantity === 0 ? 1 : quantity + 1;
      setProductCard((prev) => ({
        ...prev,
        quantity: quantityUpdate,
      }));
      setQuantityState(quantityUpdate);
      const oldCart = cart.filter((item) => item.id !== productCard.id);
      setCart([...oldCart, { ...productCard, quantity: quantityUpdate }]);
      const test = [...oldCart, { ...productCard, quantity: quantityUpdate }];
      localStorage.setItem('cart', JSON.stringify(test));
      setUpdateTotal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementar = () => {
    const { quantity } = productCard;
    const quantityUpdate = quantity === 1 ? 0 : quantity - 1;
    setProductCard((prev) => ({
      ...prev,
      quantity: quantityUpdate,
    }));
    setQuantityState(quantityUpdate);
    setUpdateTotal(true);
    const oldCart = cart.filter((item) => item.id !== productCard.id);
    if (quantityUpdate === 0) {
      setCart(oldCart);
      localStorage.setItem('cart', JSON.stringify(oldCart));
    } else {
      setCart([...oldCart, { ...productCard, quantity: quantityUpdate }]);
      localStorage.setItem(
        'cart',
        JSON.stringify([...oldCart, { ...productCard, quantity: quantityUpdate }]),
      );
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
            {productCard.price.replace('.', ',')}
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
          <input
            data-testid={ `customer_products__button-card-rm-item-${productCard.id}` }
            name={ productCard.name }
            type="number"
            value={ quantityState }
            onChange={ handleChange }
          />
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
  setUpdateTotal: PropTypes.func.isRequired,
};

export default ProductCard;
