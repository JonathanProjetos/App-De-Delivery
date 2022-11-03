import React from 'react';
import axios from 'axios';
import { screen, cleanup, waitForElement, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import axiosMock from './testsMocks/axios';
import userMock from './testsMocks/user';
import Login from '../pages/Login';
import App from '../App';

jest.mock('axios');

describe('Pagina Login', () => {
  it('existe um input email, um input password e o botao de login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId('common_login__input-email');
    const passInput = screen.getByTestId('common_login__input-email');
    const enterButton = screen.getByTestId('common_login__button-login');
    expect(passInput && emailInput && enterButton).toBeInTheDocument();
  });
  it('login com usuario valido redireciona para pagina /customer/products', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const { history } = renderWithRouter(<App />);
    const enterButton = screen.getByTestId('common_login__button-login');
    expect(enterButton).toBeInTheDocument();
    axios.post.mockResolvedValueOnce(userMock.loginUser);
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/customer/products');
  });
});
