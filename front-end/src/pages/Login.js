import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const isLoginValid = () => {
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 7;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  };

  const onLoginSubmit = () => {
    navigate('/......');
  };

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
              value={ input.password }
              onChange={ handleInputChange }
              placeholder="Password"
            />
          </label>

          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ !isLoginValid() }
            onClick={ onLoginSubmit }
          >
            Enter
          </button>
          <button type="button">
            Ainda não tenho
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
