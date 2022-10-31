import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request';

function Login() {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [roleData, setRoleData] = useState('');
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const loginValidateToken = async (event) => {
    event.preventDefault();
    try {
      const { token, role, name } = await requestLogin('/login', { ...input });
      setToken(token);
      setRoleData(role);
      console.log(name);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setIsLogged(true);
    } catch (error) {
      // alert(`${error.response.request.status} | ${error.response.data.message}`);
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

  // rota esta dinâmica vindo a role do banco conforme o login, as pessoas logadas estão definidas no seeders;

  if (isLogged) return <Navigate to="/customer/products" />;

  return (
    <section>
      <div />
      <div>
        <form>
          <label htmlFor="email-input">
            <input
              data-testid="common_login__input-email"
              type="email"
              name="email"
              id="email-input"
              value={ input.email }
              onChange={ handleInputChange }
              placeholder="email@trybeer.com.br"
            />
          </label>

          <label htmlFor="password-input">
            <input
              data-testid="common_login__input-password"
              type="password"
              name="password"
              id="password-input"
              value={ input.password }
              onChange={ handleInputChange }
              placeholder="Password"
            />
          </label>

          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ !isLoginValid() }
            onClick={ (event) => loginValidateToken(event) }
          >
            Enter
          </button>
          {
            (failedTryLogin)
              ? (
                <p
                  data-testid="common_login__element-invalid-email"
                >
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
            data-testid="common_login__button-register"
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
