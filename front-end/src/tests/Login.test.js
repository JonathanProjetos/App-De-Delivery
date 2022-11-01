import React from 'react';
import { screen, cleanup, waitForElement, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import axiosMock from './testsMocks/axios';
import userMock from './testsMocks/user';
import Login from '../pages/Login';

jest.mock()

describe('Testando pagina Login', () => {
  axiosMock.get.mockResolvedValueOnce(userMock.loginUser);
  afterEach(cleanup);

  it('testa o input email', () => {
  });
});
