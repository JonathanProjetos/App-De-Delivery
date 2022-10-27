// import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';

function Cadastro()  {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
     

  const handleChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const validateEmail = () => {
    const { email } = input;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    
  }

  return(
    <section>
      <div className="register-container">
        <h1>Cadastro</h1>
        <form>
    <label htmlFor="nome">
      Nome:
      <input
        id="nome"
        value={ input.name }
        name="name"
        type="text"
        placeholder="Nome de usuario"
        onChange={ handleChange }
      />
    </label>
    <label htmlFor="email">
      Email:
      <input
        value={ input.email }
        name="email"
        id="email"
        type="email"
        placeholder="email"
        onChange={ handleChange }
      />
    </label>
    <label htmlFor="password">
      Senha:
      <input
        value={ input.assword }
        name="password"
        id="password"
        type="password"
        placeholder="Senha"
        onChange={ handleChange }
      />
    </label>
    <button
      data-testid="register-btn"
      type="submit"
      disabled={ !validateEmail() }
      onClick={ handleSubmit }
    >
      Cadastrar
    </button>
    </form>
  </div>
    </section>
  );
}

export default Cadastro;
