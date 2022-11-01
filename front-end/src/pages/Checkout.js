import React, { useEffect, useState } from 'react';
import { pessoa } from '../mock/checkout';
import Header from '../components/Header';

function Checkout() {
  const [dataCart, setDataCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [dados, setDados] = useState({
    option: '',
    endereco: '',
    numero: '',
  });

  useEffect(() => {
    // setDataFilter([...mockitens]);
    const getCart = JSON.parse(localStorage.getItem('cart'));
    const getTotal = JSON.parse(localStorage.getItem('total'));
    getCart.forEach((i) => {
      i.totalProduct = (i.price * i.quantity).toFixed(2);
    });
    setDataCart(getCart);
    setTotal(getTotal);
  }, [setDataCart]);

  console.log(dataCart);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDados((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    // aqui finaliza a compra
    const fake = 'funciona';
    return console.log(fake);
  };

  const handleClickRemove = ({ target }) => {
    // subistituir mock aqui
    const removeItem = dataCart.filter((i, index) => index !== Number(target.id));
    localStorage.setItem('cart', JSON.stringify(removeItem));
    setDataCart(removeItem);
    const totalValue = removeItem.reduce((
      acc,
      { price, quantity },
    ) => acc + (price * quantity), 0).toFixed(2);
    localStorage.setItem('total', JSON.stringify(totalValue));
    setTotal(totalValue);
  };

  useEffect(() => {

  }, []);

  const titulos = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];
  // console.log(().replace('.', ','));
  return (
    <div>
      <Header />
      <h1>Finalizar Pedido</h1>
      <div>
        <table>
          <thead>
            <tr>
              { titulos.map((titulo) => (
                <th key={ titulo }>{titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { // mock precisa ser alterado 'mockitens', 'pessoa'.
              dataCart.map((data, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {(index + 1)}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {data.name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {data.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {data.price.replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$ ${data.totalProduct.replace('.', ',')}`}
                  </td>
                  <td>
                    <button
                      id={ index }
                      type="button"
                      onClick={ handleClickRemove }
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${total.toString().replace('.', ',')}`}

        </h2>
      </div>
      <h1>Detalhes e Endereço para Entrega</h1>
      <div>
        <label htmlFor="1">
          P.Vendedora Responsável:
          <select
            id="1"
            data-testid="customer_checkout__select-seller"
            value={ dados.option }
            name="option"
            onChange={ handleChange }
          >
            { pessoa.map((data, index) => (
              <option key={ index }>{ data }</option>
            ))}
          </select>
        </label>
        <label htmlFor="2">
          Endereço
          <input
            id="2"
            type="text"
            name="endereco"
            data-testid="customer_checkout__input-address"
            value={ dados.endereco }
            onChange={ handleChange }
            placeholder="Rua dos remotos, bairro AWS"
          />
        </label>
        <label htmlFor="3">
          Número
          <input
            id="3"
            type="text"
            name="numero"
            data-testid="customer_checkout__input-address-number"
            value={ dados.numero }
            onChange={ handleChange }
            placeholder="666"
          />
        </label>
        <div>
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleClick }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
