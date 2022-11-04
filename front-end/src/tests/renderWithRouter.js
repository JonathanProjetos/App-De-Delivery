import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(
      <MemoryRouter history={ history } initialEntries={ historyEntries }>
        {component}
      </MemoryRouter>,
    ),
    history,
  };
};
export default renderWithRouter;
