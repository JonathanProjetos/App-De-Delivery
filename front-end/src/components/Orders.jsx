import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestAllData } from '../services/request';

function Orders({ role }) {
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    (async () => {
      const data = await requestAllData(`/${role}/products`);
      setOrders(data);
      console.log('data order', data);
    })();
  }, [role]);

  return (
    <div>
      {
        orders ? orders.map((order) => (
          <Link
            key={ order.id }
            to={ `/${role}/orders/${order.id}` }
            params={ order.id }
          />
        )) : <p>Não existe nenhuma venda...</p>
      }
    </div>
  );
}

Orders.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Orders;
