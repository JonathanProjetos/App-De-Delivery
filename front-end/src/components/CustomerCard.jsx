import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function CustomerCard({ id, saleDate, totalPrice, status }) {
  const convertDateSale = new Date(saleDate).toLocaleDateString('pt-BR');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  useEffect(() => {
    console.log('status: ', status);
    switch (status) {
    case 'Entregue':
      setDeliveryStatus('orderEntregue');
      break;
    case 'Preparando':
      setDeliveryStatus('orderTransito');
      break;
    case 'Pendente':
      setDeliveryStatus('orderPendente');
      break;
    default:
      break;
    }
  }, [status]);

  return (
    <div className="item-card">
      <p data-testid={ `customer_orders__element-order-id-${id}` } className="orderNum">
        {`Pedido 000${String(id)}`}
      </p>
      <p
        data-testid={
          `customer_orders__element-delivery-status-${id}`
        }
        className={ deliveryStatus }
      >
        {status}
      </p>
      <div className="orderDetail">
        <p data-testid={ `customer_orders__element-order-date-${id}` }>
          {convertDateSale}
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          {`R$ ${String(totalPrice).replace('.', ',')}`}
        </p>
      </div>
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
