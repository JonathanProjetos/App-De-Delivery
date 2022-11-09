import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken, validLogin, updateStatus } from '../services/request';
import HeaderSeller from '../components/HeaderSeller';

const STATUS = 'Em Trânsito';

function DetalheDePedidoSeller() {
  const navigate = useNavigate();

  const [dataPedido, setDataPedido] = useState('');
  const [dateSeller, setDetaSeller] = useState('');
  const [total, setTotal] = useState('');
  const [dataProducts, setDataproducts] = useState('');

  useEffect(() => {
    // validação para token ao acessar a page
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const requestValid = async () => {
      try {
        setToken(token);
        const validToken = await validLogin('/login/validate');
        if (!validToken) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestValid();
  }, [navigate]);

  useEffect(() => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];

    const requestSaleData = async () => {
      try {
        const data = await requestData(`/seller/orders/${lastSegment}`);

        const seller = Object.values(data[0].seller);
        setDataPedido(seller);
      } catch (err) {
        console.error(err);
      }
    };
    requestSaleData();
  }, [navigate]);

  useEffect(() => {
    const data = Object.values(dataPedido);
    if (data) {
      data.forEach((i) => {
        const convertDateSeller = new Date(i.saleDate).toLocaleDateString('pt-BR');
        setDetaSeller(convertDateSeller);
        setDataproducts(i.products);
      });
    }
  }, [dataPedido]);

  useEffect(() => {
    const sumUnitPrice = dataProducts && dataProducts.map((i) => {
      let totalSum = i.totalProductUnit;
      totalSum = (i.price * i.saleProduct.quantity);
      return totalSum.toFixed(2);
    });
    setTotal(sumUnitPrice);
    setDataproducts(dataProducts);
  }, [dataProducts]);

  const updateStatusPreparando = async () => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];

    try {
      const objectStatus = {
        status: 'Preparando',
        id: dataPedido && dataPedido[0].id,
      };
      await updateStatus('/customer/orderStatus', { ...objectStatus });
      const data = await requestData(`/seller/orders/${lastSegment}`);

      const seller = Object.values(data && data[0].seller);
      setDataPedido(seller);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatusSaiuParaEntrega = async () => {
    const getUrl = document.URL;
    const urlArray = getUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1];

    try {
      const objectStatus = {
        status: STATUS,
        id: dataPedido && dataPedido[0].id,
      };
      await updateStatus('/customer/orderStatus', { ...objectStatus });
      const data = await requestData(`/seller/orders/${lastSegment}`);
      const seller = Object.values(data && data[0].seller);
      setDataPedido(seller);
    } catch (err) {
      console.error(err);
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
      <HeaderSeller />
      <h1>Detalhe do Pedido</h1>
      <div>
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO 000${dataPedido && dataPedido[0].id}`}

        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          {dateSeller}
        </p>
        <p
          data-testid={ 'seller_order_details_'
          + '_element-order-details-label-delivery-status' }
        >
          {dataPedido && dataPedido[0].status}
        </p>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          onClick={ updateStatusPreparando }
          disabled={ dataPedido && (dataPedido[0]
            .status !== 'Pendente') }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ updateStatusSaiuParaEntrega }
          disabled={
            dataPedido && (dataPedido[0].status !== 'Preparando')
          }
        >
          SAIU PARA ENTREGA
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
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {(index + 1)}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {data.name}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {data.saleProduct.quantity}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${data.price.replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${total && total[index].toString().replace('.', ',')}`}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p data-testid="seller_order_details__element-order-total-price">
        {`Total: R$ ${dataPedido && dataPedido[0]
          .totalPrice.toString().replace('.', ',')}`}

      </p>
    </div>
  );
}

export default DetalheDePedidoSeller;
