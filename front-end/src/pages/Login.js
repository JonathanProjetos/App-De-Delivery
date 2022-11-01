import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

function Login() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const loginValidateToken = async (event) => {
    event.preventDefault();
    try {
      const { token, role } = await requestLogin('/login', { email, password });
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [input.email, input.password]);

  const handleInputChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };
  const isLoginValid = () => {
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  };

  if (isLogged) return navigate('/produtos');
  return (
    <section>
      <div />
      <div>
        <form>
          <label htmlFor="email-input">
            <input
              type="email"
              name="email"
              id="email-input"
              datatest-id="common_login__input-email"
              value={ input.email }
              onChange={ handleInputChange }
              placeholder="email@trybeer.com.br"
            />
          </label>

          <label htmlFor="password-input">
            <input
              type="password"
              name="password"
              id="password-input"
              datatest-id="common_login__input-password"
              value={ input.password }
              onChange={ handleInputChange }
              placeholder="Password"
            />
          </label>

          <button
            type="button"
            disabled={ !isLoginValid() }
            onClick={ (event) => loginValidateToken(event) }
            datatest-id="common_login__button-login"
          >
            Enter
          </button>
          {
            (failedTryLogin)
              ? (
                <p>
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
          <button
            type="button"
            datatest-id="common_login__button-register"
            onClick={ () => navigate('/register') }

          >
            Ainda não tenho conta
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
