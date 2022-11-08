import { setToken, validLogin } from '../services/request';

const userLogin = async () => {
  const getToken = JSON.parse(localStorage.getItem('user'));
  const { token } = getToken;
  try {
    setToken(token);
    const validToken = await validLogin('/login/validate');
    if (!validToken) {
      navigate('/login');
    }
  } catch (error) {
    console.log(error);
  }
};

export default userLogin;
