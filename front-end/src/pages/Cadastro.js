import React, { useState } from 'react';
import { requestLogin, setToken } from '../services/request';

function Cadastro() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [failedToRegister, setFailedToRegister] = useState(false);

  const handleChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
      [target.password]: target.value,
    });
  };

  const validateEmail = () => {
    const { email } = input;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = () => {
    const { name } = input;
    return (name > 0);
  };

  const validatePass = () => {
    const { password } = input;
    return (password > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await requestLogin(
        '/register',
        { ...input },
      );
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'customer');
      console.log(token.data);
    } catch (error) {
      console.log(error);
      setFailedToRegister(true);
    }
  };

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
              value={ input.password }
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
            disabled={
              !!(!validateEmail() && !validateName() && !validatePass())
            }
            onClick={ handleSubmit }
          >
            Cadastrar
          </button>
          {
            (failedToRegister)
              ? (
                <p>
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
