import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/request';
import Header from '../components/Header';

function DetalhesPedido() {
  const navigate = useNavigate();

  const [dataDetails, setDataDetails] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];
    console.log(lastSegment);
    const requestSaleData = async () => {
      try {
        const data = await requestData(`/customer/orders/${lastSegment}`);
        setDataDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    const salesData = requestSaleData();
    setDataDetails(salesData);

    const getSeller = localStorage.getItem(salesData.find(
      (id) => id === salesData.seller_id,
    ));
    setSellerName(getSeller);
  }, [navigate]);

  // const handleDeliveryCheck = () => {
  //   setIsDelivered(true);
  // };

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <section>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          PEDIDO 0003
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          P.Vend:
          {sellerName}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          {dataDetails.sale_date}
        </p>
        <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${index}`
          }
        >
          {
            (!isDelivered) ? (<p> Pedido a caminho</p>) : <p> Pedido entregue </p>
          }
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ isDelivered }
          onClick={ handleDeliveryCheck }
        >
          Marcar como entregue
        </button>
      </section>

    </div>
  );
}

export default DetalhesPedido;
