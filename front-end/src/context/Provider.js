import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function RecipesProvider({ children }) {
  const contextType = null;

  return (
    <Context.Provider value={ contextType }>
      {children}
    </Context.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
