import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, requestLogin, setToken, requestDelete } from '../services/request';
import Header from '../components/Header';
import CadastroUserAdmin from '../components/CadastroUserAdmin';

function Gerenciamento() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [newUser, setNewUser] = useState(false);
  const ROUTER_ADMIN = '/admin/manage';
  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const validToken = setToken(token);

    if (validToken) {
      navigate('/login');
    }
  }, [navigate]);

  const deleteUser = async ({ target }) => {
    const { id } = target;
    await requestDelete(`/admin/manage/${id}`);
    const newListUser = users.filter((user) => user.id !== Number(id));
    setUsers(newListUser);
  };

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const token = localStorage.getItem('token');
        const validate = await requestLogin('/login/validate', { token });
        if (!validate) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
        const data = await requestData(ROUTER_ADMIN);

        const result = data.filter((user) => user.role !== 'administrator');
        setUsers(result);
      } catch (err) {
        console.error(err);
      }
    };
    loginValidate();
  }, [navigate]);

  return (
    <main>
      <Header />
      <CadastroUserAdmin setUsers={ setUsers } />
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={ user.id }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {(index + 1)}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}

            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {user.role === 'seller' ? 'P. Vendedora' : 'Cliente'}

            </td>
            <td>
              {' '}
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                id={ user.id }
                onClick={ deleteUser }
              >
                X
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </main>
  );
}

export default Gerenciamento;
