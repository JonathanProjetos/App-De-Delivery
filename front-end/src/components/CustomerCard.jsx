import PropTypes from 'prop-types';
import React from 'react';

function CustomerCard({ id, saleDate, totalPrice, status }) {
  const convertDateSale = new Date(saleDate).toLocaleDateString('pt-BR');

  return (
    <div className="item">
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {`Pedido 000${String(id)}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <p data-testid={ `customer_orders__element-order-date-${id}` }>
        {convertDateSale}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>
        {`R$ ${String(totalPrice).replace('.', ',')}`}
      </p>
    </div>
  );
}

CustomerCard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default CustomerCard;
