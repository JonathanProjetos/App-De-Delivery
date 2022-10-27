// import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import { requestLogin, setToken, requestData } from '../services/request';

function Cadastro() {
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { token } = await requestLogin('/login', { email, password });
  //     setToken(token);
  //     const { role } = await requestData('/login', { email, password });
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('role', role);
  //     setIsLogged(true);
  //   } catch (error) {
  //     setFailedTryLogin(true);
  //     setIsLogged(false);
  //   }
  // };

  return (
    <section>
      <div className="register-container">
        <h1>Cadastro</h1>
        <form>
          <label htmlFor="nome">
            Nome:
            <input
              data-testid="common_register__input-name"
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
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
              value={ input.assword }
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="common_register__button-register"
            type="submit"
            disabled={ !validateEmail() }
            // onClick={ handleSubmit }
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Cadastro;
