import axios from 'axios';

const port = 3001;

const PORT = process.env.PORT || port;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const doLogin = async (email, password) => {
  try {
    const result = await api.post('/login', { email, password });
    return result.data;
  } catch (e) {
    return e;
  }
};

export const getUserByEmail = async (userEmail) => {
  const result = await api.post('/getUserByEmail', { userEmail });
  return result.data;
};

export const registerCustomerUser = async (newUser) => {
  console.log('newUser', newUser)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  };
  const response = await fetch('http://localhost:3001/user/', requestOptions);
    const data = await response.json();
    await console.log('data', {...data});
    return data;
};
