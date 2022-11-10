import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import localStorageMock from './testsMocks/localStorage.mock';

const BUTTON_PRODUTOS = 'customer_products__element-navbar-link-products';
const BUTTON_MEUS_PEDIDOS = 'customer_products__element-navbar-link-orders';
const BUTTON_SAIR = 'customer_products__element-navbar-link-logout';

const CUSTOMER_PRODUCTS = '/customer/products';

describe('Pagina Produtos', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(localStorageMock));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('verifica a renderizacao do Header', () => {
    renderWithRouter(<App />, [CUSTOMER_PRODUCTS]);
    const btnProdutos = screen.getByTestId(BUTTON_PRODUTOS);
    const btnPedidos = screen.getByTestId(BUTTON_MEUS_PEDIDOS);
    const btnSair = screen.getByTestId(BUTTON_SAIR);

    expect(btnProdutos && btnPedidos && btnSair).toBeInTheDocument();
  });
  it('verifica a renderizacao do botao de carrinho', () => {
    renderWithRouter(<App />, [CUSTOMER_PRODUCTS]);
    const btnCarrinho = screen.getByTestId('customer_products__button-cart');

    expect(btnCarrinho).toBeInTheDocument();
  });
  it('verifica a renderizacao do card de produtos', async () => {
    renderWithRouter(<App />, [CUSTOMER_PRODUCTS]);
    await waitFor(() => {
      expect(screen.getByText('Skol Lata 250ml')).toBeInTheDocument();
      expect(screen.getByText('Heineken 600ml')).toBeInTheDocument();
      expect(screen.getByText('Antarctica Pilsen 300ml')).toBeInTheDocument();
      expect(screen.getByText('Brahma 600ml')).toBeInTheDocument();
      expect(screen.getByText('Skol 269ml')).toBeInTheDocument();
      expect(screen.getByText('Skol Beats Senses 313ml')).toBeInTheDocument();
      expect(screen.getByText('Becks 330ml')).toBeInTheDocument();
      expect(screen.getByText('Brahma Duplo Malte 350ml')).toBeInTheDocument();
      expect(screen.getByText('Becks 600ml')).toBeInTheDocument();
      expect(screen.getByText('Skol Beats Senses 269ml')).toBeInTheDocument();
      expect(screen.getByText('Stella Artois 275ml')).toBeInTheDocument();
    });
  });
});
