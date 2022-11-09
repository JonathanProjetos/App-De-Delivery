import PropTypes from 'prop-types';
import React from 'react';

function SellerCard({
  id, saleDate, totalPrice, status, deliveryAddress, deliveryNumber }) {
  const CSS = {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
  };

  return (
    <div style={ CSS }>
      <p data-testid={ `seller_orders__element-order-id-${id}` }>
        {`Pedido ${String(id)}`}
      </p>
      <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <p data-testid={ `seller_orders__element-order-date-${id}` }>
        {saleDate}
      </p>
      <p data-testid={ `seller_orders__element-card-price-${id}` }>
        {`R$ ${String(totalPrice).replace('.', ',')}`}
      </p>
      <p data-testid={ `seller_orders__element-card-address-${id}` }>
        {`Endereço: ${deliveryAddress}, ${deliveryNumber}`}
      </p>
    </div>
  );
}

SellerCard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default SellerCard;
