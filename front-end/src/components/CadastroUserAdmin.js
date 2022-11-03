import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { requestLogin } from '../services/request';

function CadastroUserAdmin({ setUsers }) {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [failedToRegister, setFailedToRegister] = useState(false);

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
    try {
      const data = await requestLogin('/admin/manage', { ...input });
      console.log(data);
      setFailedToRegister(false);
      setUsers((prevState) => [...prevState, data]);
    } catch (error) {
      setFailedToRegister(true);
    }
  };

  return (
    <section>
      <div>
        <h1>Cadastro</h1>
        <form>
          <label htmlFor="nome">
            Nome:
            <input
              data-testid="admin_manage__input-name"
              id="nome"
              value={ input.name }
              name="name"
              type="text"
              placeholder="Nome e sobrenome"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="admin_manage__input-email"
              value={ input.email }
              name="email"
              id="email"
              type="email"
              placeholder="seu-email@site.com.br"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="admin_manage__input-password"
              value={ input.password }
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              onChange={ handleChange }
            />
          </label>
          <select
            onChange={ handleChange }
            value={ input.role }
            name="role"
            data-testid="admin_manage__select-role"
          >
            <option>seller</option>
            <option>customer</option>
          </select>
          <button
            data-testid="admin_manage__button-register"
            type="submit"
            disabled={ !validateFields() }
            onClick={ handleSubmit }
          >
            CADASTRAR
          </button>
          {
            (failedToRegister)
              ? (
                <p
                  data-testid="admin_manage__element-invalid-register"
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

CadastroUserAdmin.propTypes = {
  setUsers: PropTypes.func.isRequired,
};

export default CadastroUserAdmin;
