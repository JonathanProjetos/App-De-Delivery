import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <MemoryRouter initialEntries={ customHistory }>
      {component}
    </MemoryRouter>,
  );

  return { initialEntries: customHistory, ...returnFromRender };
}

export default renderWithRouter;
