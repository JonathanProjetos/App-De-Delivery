import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestAllData } from '../services/request';
import SellerCard from './SellerCard';

function Orders({ role }) {
  const [orders, setOrders] = useState(undefined);
  useEffect(() => {
    (async () => {
      const data = await requestAllData('/seller/orders');
      setOrders(data[0].seller);
      localStorage.setItem('pedidos', JSON.stringify(data));
    })();
  }, [role]);

  return (
    <div className="container-orders">
      {
        orders ? orders.map((order) => (
          <Link
            key={ order.id }
            to={ `/seller/orders/${order.id}` }
            params={ order.id }
          >
            <SellerCard
              id={ order.id }
              saleDate={ order.saleDate }
              totalPrice={ order.totalPrice }
              status={ order.status }
              deliveryAddress={ order.deliveryAddress }
              deliveryNumber={ order.deliveryNumber }
            />

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
