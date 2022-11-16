import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import Header from '../components/Header';
import CadastroUserAdmin from '../components/CadastroUserAdmin';
import TableUsers from '../components/TableUsers';

function Gerenciamento() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  console.log(users);
  // const [newUser, setNewUser] = useState(false);
  const ROUTER_ADMIN = '/admin/manage';
  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem('user'));
    const { token } = getToken;
    const validToken = api.setToken(token);

    if (validToken) {
      navigate('/login');
    }
  }, [navigate]);

  // const deleteUser = async ({ target }) => {
  //   const { id } = target;
  //   await api.requestDelete(`/admin/manage/${id}`);
  //   const newListUser = users.filter((user) => user.id !== Number(id));
  //   setUsers(newListUser);
  // };

  useEffect(() => {
    const loginValidate = async () => {
      try {
        const token = localStorage.getItem('token');
        const validate = await api.requestLogin('/login/validate', { token });
        if (!validate) {
          localStorage.setItem('user', '');
          navigate('/login');
        }
        const data = await api.requestData(ROUTER_ADMIN);

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
      <h1 className="subtitle">Cadastro</h1>
      <CadastroUserAdmin setUsers={ setUsers } />
      <h1 className="subtitle">Lista de Usuários</h1>
      <TableUsers />
      {/* <div className="table-all">
        <table>
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
        </table>
      </div> */}
    </main>
  );
}

export default Gerenciamento;
