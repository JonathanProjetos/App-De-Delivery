import React from 'react';
import { screen } from '@testing-library/react';
// import { waitFor } from '@testing-library/react';
// import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import userMock from './testsMocks/user';

jest.mock('axios');

const INPUT_EMAIL = 'common_login__input-email';
const INPUT_PASSWORD = 'common_login__input-password';

describe('Pagina Login', () => {
  it('existe um input email, um input password e o botao de login', () => {
    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passInput = screen.getByTestId(INPUT_PASSWORD);
    const enterButton = screen.getByTestId('common_login__button-login');

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
    const { history } = renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);
    userEvent.type(emailInput, 'zebirita@email.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);
    userEvent.type(passInput, '$#zebirita#$');

    const enterButton = screen.getByTestId('common_login__button-login');

    expect(enterButton).toBeInTheDocument();

    userEvent.click(enterButton);
    // history.push('/customer/products');

    expect(history.location.pathname).toBe('/customer/products');
  });
});
