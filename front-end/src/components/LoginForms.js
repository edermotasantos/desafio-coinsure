import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import ErrorLogin from './ErroLogin';
import { doLogin } from '../services/endpointAPI';
import validateEmail from '../validations/validateEmail';

const messageError = 'Login e/ou senha inválidos';
const testId = 'common_login__element-invalid-email';
const testIdEmail = 'common_login__input-email';
const invalidPassword = 'common_login__input-password';
const testIdBtnLogin = 'common_login__button-login';
const testIdBtnRegister = 'common_login__button-register';

const urlByUserType = {
  customer: '/customer/products',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const navigate = useNavigate();

  const clickLoginButton = async () => {
    const response = await doLogin(email, md5(password));
    if (!response.message) {
      localStorage.setItem('user', JSON.stringify(response));
      setErrorMessage(true);
      return navigate(urlByUserType[response.role]);
    }
    setErrorMessage(false);
  };

  useEffect(() => {
    const validateFields = () => {
      const six = 6;
      const validEmail = validateEmail(email);
      const resultButton = password.length >= six && validEmail;
      setLoginButton(resultButton);
    };
    validateFields();
  }, [email, password]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(urlByUserType[user.role]);
    }
  }, [navigate]);

  return (
    <div>
      <form>
        <label htmlFor="login">
          Login
          <input
            data-testid={ testIdEmail }
            type="email"
            id="email"
            placeholder="email@trybeer.com.br"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid={ invalidPassword }
            type="password"
            id="senha"
            placeholder="*********"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </label>
        <button
          variant="primary"
          disabled={ !loginButton }
          onClick={ clickLoginButton }
          data-testid={ testIdBtnLogin }
          type="button"
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            data-testid={ testIdBtnRegister }
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
      <div hidden={ errorMessage }>
        <ErrorLogin dataTestIdError={ testId } message={ messageError } />
      </div>
    </div>
  );
}
