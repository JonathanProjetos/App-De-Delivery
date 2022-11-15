import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import {
  localStorageMock,
  localStorageAdmin,
  localStorageSeller } from './testsMocks/localStorage.mock';
import mockSeller from './testsMocks/sellerMock.mock';
import api from '../services';

jest.mock('../services');

const INPUT_EMAIL = 'common_login__input-email';
const INPUT_PASSWORD = 'common_login__input-password';
const BUTTON_ENTER_LOGIN = 'common_login__button-login';

describe('Pagina Login', () => {
  afterEach(() => jest.restoreAllMocks());

  it('existe um input email, um input password e o botao de login', () => {
    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passInput = screen.getByTestId(INPUT_PASSWORD);
    const enterButton = screen.getByTestId(BUTTON_ENTER_LOGIN);

    expect(passInput && emailInput && enterButton).toBeInTheDocument();
  });

  it('testa se possivel usar os inputs', () => {
    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);

    userEvent.type(emailInput, 'zebirita@email.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);

    userEvent.type(passInput, 'test@test.com');
  });

  it('login com usuario valido redireciona para pagina /customer/products', async () => {
    localStorage.setItem('user', { name: 'Seu Zé' });
    api.requestLogin.mockResolvedValue({ ...localStorageMock });

    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);
    userEvent.type(emailInput, 'zebirita@email.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);
    userEvent.type(passInput, '$#zebirita#$');

    const enterButton = screen.getByTestId(BUTTON_ENTER_LOGIN);

    expect(enterButton).toBeInTheDocument();

    userEvent.click(enterButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /produtos/i }));
    });
  });

  it('testando a chamada de requestData', async () => {
    localStorage.setItem('seller', [{ name: 'Cliente Zé Birita' }]);
    api.requestData.mockResolvedValue({ ...mockSeller });

    renderWithRouter(<App />, ['/login']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /produtos/i }));
    });
  });

  it('testando a chamada de setToken', async () => {
    api.setToken.mockResolvedValue('token forte aqui!!!');

    renderWithRouter(<App />, ['/login']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /produtos/i }));
    });
  });

  it('testando ao clicar no botão de cadastrar', async () => {
    renderWithRouter(<App />, ['/login']);

    const buttonLogOut = screen.getByRole('button', { name: 'Sair' });

    userEvent.click(buttonLogOut);

    const CadastroButton = screen.getByTestId('common_login__button-register');

    userEvent.click(CadastroButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Cadastro' }));
    });
  });

  it('tentando logar como admin', async () => {
    api.requestLogin.mockResolvedValue(localStorageAdmin);

    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);

    userEvent.type(emailInput, 'adm@deliveryapp.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);

    userEvent.type(passInput, '--adm2@21!!--');

    const enterButton = screen.getByTestId(BUTTON_ENTER_LOGIN);

    expect(enterButton).toBeInTheDocument();
    expect(emailInput.value).toEqual('adm@deliveryapp.com');
    expect(passInput.value).toEqual('--adm2@21!!--');

    userEvent.click(enterButton);

    await waitFor(
      () => expect(screen.getByRole('heading', {
        level: 1, name: 'Cadastro' })).toBeInTheDocument(),
      { timeout: 1000 },
    );
    localStorage.setItem('user', '');
  });

  it('tentando logar como Seller', async () => {
    api.requestLogin.mockResolvedValue(localStorageSeller);

    const { history } = renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);

    userEvent.type(emailInput, 'fulana@deliveryapp.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);

    userEvent.type(passInput, 'fulana@123');

    const enterButton = screen.getByTestId(BUTTON_ENTER_LOGIN);

    expect(enterButton).toBeInTheDocument();

    userEvent.click(enterButton);

    api.requestLogin.mockResolvedValue(true);

    await waitFor(
      () => expect(screen.getByTestId(
        'customer_products__element-navbar-user-full-name',
      )).toBeInTheDocument(),
      { timeout: 1000 },
    );
    history.push('/seller/orders');
    localStorage.setItem('user', '');
  });

  it('Testando error', async () => {
    api.requestLogin.mockImplementation(() => {
      throw new Error('Deu ruim');
    });

    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);

    userEvent.type(emailInput, 'fulana@deliveryapp.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);

    userEvent.type(passInput, 'fulana@123');

    const enterButton = screen.getByTestId(BUTTON_ENTER_LOGIN);

    expect(enterButton).toBeInTheDocument();

    userEvent.click(enterButton);

    await waitFor(
      () => expect(screen.getByTestId(
        'common_login__element-invalid-email',
      )).toBeInTheDocument(),
      { timeout: 1000 },
    );
    localStorage.setItem('user', '');
  });
});
