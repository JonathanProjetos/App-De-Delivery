import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken, validLogin, updateStatus } from '../services/request';
import Header from '../components/Header';

function DetalheDePedidoCostumer() {
  const navigate = useNavigate();

  const [dataPedidoDetail, setDataPedidoDetails] = useState('');
  const [dateSeller, setDetaSeller] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [total, setTotal] = useState('');
  const [dataProducts, setDataproducts] = useState('');
  // const [isDelivered, setIsDelivered] = useState(false);
  console.log(dataPedidoDetail && dataPedidoDetail[0].status);
  console.log(dateSeller);
  // console.log(sellerName);
  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const requestValid = async () => {
      try {
        setToken(token);
        await validLogin('/login/validate');
        if (!validToken) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];
    console.log(lastSegment);
    const requestSaleData = async () => {
      try {
        const data = await requestData(`/customer/orders/${lastSegment}`);
        const seller = Object.values(data[0].sale);
        setDataPedidoDetails(seller);
      } catch (error) {
        console.log(error);
      }
    };
    requestSaleData();
  }, [navigate]);

  useEffect(() => {
    const data = Object.values(dataPedidoDetail);
    if (data) {
      data.forEach((i) => {
        const getSeller = JSON.parse(localStorage.getItem('seller'));
        const findSellerName = getSeller.find((s) => s.id === i.sellerId);
        setSellerName(findSellerName.name);
        const convertDateSeller = new Date(i.saleDate).toLocaleDateString('pt-BR');
        setDetaSeller(convertDateSeller);
        setDataproducts(i.products);
      });
    }
  }, [dataPedidoDetail]);

  useEffect(() => {
    const sumUnitPrice = dataProducts && dataProducts.map((i) => {
      let totalSum = i.totalProductUnit;
      totalSum = (i.price * i.saleProduct.quantity);
      return totalSum.toFixed(2);
    });
    setTotal(sumUnitPrice);
    setDataproducts(dataProducts);
  }, [dataProducts]);

  // const handleDeliveryCheck = () => {
  //   setIsDelivered(true);
  // };

  const handleUpdateStatus = async () => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];
    try {
      const objectStatus = {
        status: 'Entregue',
        id: dataPedidoDetail && dataPedidoDetail[0].id,
      };
      await updateStatus('/customer/orderStatus', { ...objectStatus });
      const data = await requestData(`/customer/orders/${lastSegment}`);
      const seller = Object.values(data[0].sale);
      setDataPedidoDetails(seller);
    } catch (err) {
      console.log(err);
    }
  };

  const titulos = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
  ];

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <div>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO 000${dataPedidoDetail && dataPedidoDetail[0].id}`}

        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          {`P.Vend: ${sellerName}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          {dateSeller}
        </p>
        <p
          data-testid={ 'customer_order_details__element'
          + '-order-details-label-delivery-status' }
        >
          {dataPedidoDetail && dataPedidoDetail[0].status}
        </p>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="submit"
          onClick={ handleUpdateStatus }
          disabled={ dataPedidoDetail && dataPedidoDetail[0].status === 'Pendente' }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {titulos.map((titulo) => (
              <th key={ titulo }>{titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            dataProducts && dataProducts.map((data, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {(index + 1)}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {data.name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {data.saleProduct.quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${data.price.replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${total && total[index].toString().replace('.', ',')}`}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p data-testid="customer_order_details__element-order-total-price">
        {`Total: R$ ${dataPedidoDetail && dataPedidoDetail[0]
          .totalPrice.toString().replace('.', ',')}`}

      </p>
    </div>
  );
}

export default DetalheDePedidoCostumer;
