import React from 'react';
import { screen } from '@testing-library/react';
// import { waitFor } from '@testing-library/react';
// import axios from 'axios';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import userMock from './testsMocks/user';

jest.mock('axios');

const INPUT_NAME = 'common_register__input-name';
const INPUT_EMAIL = 'common_register__input-email';
const INPUT_PASSWORD = 'common_register__input-password';

describe('Pagina Cadastro', () => {
  it('existe os inputs nome, email, senha e o botao Cadastrar', () => {
    renderWithRouter(<App />, ['/register']);

    const nameInput = screen.getByTestId(INPUT_NAME);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passInput = screen.getByTestId(INPUT_PASSWORD);
    const registerButton = screen.getByTestId('common_register__button-register');

    expect(nameInput && passInput && emailInput && registerButton).toBeInTheDocument();
  });

  it('testa se possivel usar os inputs', () => {
    renderWithRouter(<App />, ['/register']);

    const nameInput = screen.getByTestId(INPUT_NAME);
    userEvent.type(nameInput, 'Maria Cachaca');

    const emailInput = screen.getByTestId(INPUT_EMAIL);
    userEvent.type(emailInput, 'mariacachaca@email.com');

    const passInput = screen.getByTestId(INPUT_PASSWORD);
    userEvent.type(passInput, 'test@test.com');
  });
});
