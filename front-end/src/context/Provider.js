import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function DeliveryProvider({ children }) {
  const [cart, setCart] = useState([]);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', JSON.stringify(0));
  const contextType = useMemo(() => ({
    cart, setCart,
  }), [cart]);

  return (
    <Context.Provider value={ contextType }>
      {children}
    </Context.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
