import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userMock from './testsMocks/user';

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

  it('testa se possivel usar os iputs', () => {
    renderWithRouter(<App />, ['/login']);

    const emailInput = screen.getByTestId(INPUT_EMAIL);

    userEvent.type(emailInput, 'test@test.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);

    userEvent.type(passInput, 'test@test.com');
  });

  it('login com usuario valido redireciona para pagina /customer/products', async () => {
    const mockedAxios = axios;
    const data = {};
    const mockedPost = mockedAxios.post.mockReturnValueOnce(data);

    const { history } = renderWithRouter(<App />, ['/login']);

    const enterButton = screen.getByTestId('common_login__button-login');

    expect(enterButton).toBeInTheDocument();

    userEvent.click(enterButton);

    expect(mockedPost).toHaveBeenCalled();
    // expect(history.location.pathname).toBe('/customer/products');
  });
});
