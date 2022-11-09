import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestAllData } from '../services/request';
import CustomerCard from './CustomerCard';
import SellerCard from './SellerCard';
// import mock from '../mock/order';

function Orders({ role }) {
  const [orders, setOrders] = useState(undefined);
  useEffect(() => {
    (async () => {
      const data = await requestAllData(`/${role}/orders`);
      setOrders(data);
      localStorage.setItem('pedidos', JSON.stringify(data));
    })();
  }, [role]);

  return (
    <div>
      {
        orders ? orders.map((order) => (
          <Link
            key={ order.id }
            to={ `/customer/orders/${order.id}` }
            params={ order.id }
          >
            { role === 'customer' ? (
              <CustomerCard
                id={ order.id }
                saleDate={ order.saleDate }
                totalPrice={ order.totalPrice }
                status={ order.status }
              />
            ) : (
              <SellerCard
                id={ order.id }
                saleDate={ order.saleDate }
                totalPrice={ order.totalPrice }
                status={ order.status }
                deliveryAddress={ order.deliveryAddress }
                deliveryNumber={ order.deliveryNumber }
              />
            )}
          </Link>
        )) : <p>Não existe nenhuma venda...</p>
      }
    </div>
  );
}

Orders.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Orders;
