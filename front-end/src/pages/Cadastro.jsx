import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/request';
import css from '../css/style.css';

function Cadastro() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [failedToRegister, setFailedToRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const validateFields = () => {
    const { email, name, password } = input;
    const NAME_MINIMUM_LENGTH = 12;
    const PW_MINIMUM_LENGTH = 6;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
    && password.length >= PW_MINIMUM_LENGTH && name.length >= NAME_MINIMUM_LENGTH;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = input;
    try {
      await requestLogin(
        '/register',
        { name, email, password },
      );
      setIsLogged(true);
    } catch (err) {
      console.error(err);
      setFailedToRegister(true);
      setIsLogged(false);
    }
  };

  if (isLogged) return navigate('/customer/products');

  return (
    <section style={ css } className="container">
      <div className="register-container">
        <h2 className="title">Cadastro</h2>
        <form>
          <label htmlFor="nome" className="input-div one">
            <input
              data-testid="common_register__input-name"
              id="nome"
              value={ input.name }
              name="name"
              type="text"
              placeholder="Nome de usuario"
              onChange={ handleChange }
              className="input"
            />
          </label>
          <label htmlFor="email" className="input-div two">
            <input
              data-testid="common_register__input-email"
              value={ input.email }
              name="email"
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={ handleChange }
              className="input"
            />
          </label>
          <label htmlFor="password" className="input-div three">
            <input
              data-testid="common_register__input-password"
              value={ input.password }
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              onChange={ handleChange }
              className="input"
            />
          </label>
          <button
            data-testid="common_register__button-register"
            type="submit"
            disabled={ !validateFields() }
            onClick={ handleSubmit }
            className="btn"
          >
            Cadastrar
          </button>
          {
            (failedToRegister)
              ? (
                <p
                  data-testid="common_register__element-invalid_register"
                >
                  {
                    `Algo deu errado no seu cadastro.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
        </form>
      </div>
    </section>
  );
}

export default Cadastro;
