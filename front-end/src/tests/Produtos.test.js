import React from 'react';
import { screen } from '@testing-library/react';
// import { waitFor } from '@testing-library/react';
// import axios from 'axios';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import userMock from './testsMocks/user';
import localStorageMock from './testsMocks/localStorage.mock';

const BUTTON_PRODUTOS = 'customer_products__element-navbar-link-products';
const BUTTON_MEUS_PEDIDOS = 'customer_products__element-navbar-link-orders';
const BUTTON_SAIR = 'customer_products__element-navbar-link-logout';

describe('Pagina Produtos', () => {
  Object.defineProperty(window, 'localStorage', {
    user: localStorageMock });

  it('verifica a renderizacao do Header', () => {
    renderWithRouter(<App />, ['/customer/products']);
    
    // const btnProdutos = screen.getByTestId(BUTTON_PRODUTOS);
    // const btnPedidos = screen.getByTestId(BUTTON_MEUS_PEDIDOS);
    // const btnSair = screen.getByTestId(BUTTON_SAIR);

    // expect(btnProdutos && btnPedidos && btnSair).toBeInTheDocument();
  });
});
