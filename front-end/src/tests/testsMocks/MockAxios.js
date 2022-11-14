import axios from 'axios';

async function AxiosLogin() {
  const loginTest = await axios.post('http://localhost:3000/login');
  const loginTestGet = await axios.get('http://localhost:3000/customer/products');
  return { loginTest, loginTestGet };
}

export default AxiosLogin;
