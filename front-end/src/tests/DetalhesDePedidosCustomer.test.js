import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import localStorageMock from './testsMocks/localStorage.mock';
import cartMock from './testsMocks/cartMock.mock';
import sellerMock from './testsMocks/sellerMock.mock';

const BUTTON_PRODUTOS = 'customer_products__element-navbar-link-products';
const BUTTON_MEUS_PEDIDOS = 'customer_products__element-navbar-link-orders';
const BUTTON_SAIR = 'customer_products__element-navbar-link-logout';

const ORDER_DETAILS_CUSTOM = '/customer/orders/:id';

describe('Pagina Checkout', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(localStorageMock));
    localStorage.setItem('cart', JSON.stringify(cartMock.cartMockObj));
    localStorage.setItem('seller', JSON.stringify(sellerMock));
    localStorage.setItem('total', JSON.stringify(cartMock.total));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('verifica a renderizacao do Header', () => {
    renderWithRouter(<App />, [ORDER_DETAILS_CUSTOM]);
    const btnProdutos = screen.getByTestId(BUTTON_PRODUTOS);
    const btnPedidos = screen.getByTestId(BUTTON_MEUS_PEDIDOS);
    const btnSair = screen.getByTestId(BUTTON_SAIR);

    expect(btnProdutos && btnPedidos && btnSair).toBeInTheDocument();
  });
});
