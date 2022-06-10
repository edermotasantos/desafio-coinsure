import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

import { registerCustomerUser } from '../services/endpointAPI';

const EMAIL_LENGTH = 12;
const PASSWORD_LENGTH = 6;

function Register() {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [formValidation, setFormValidation] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (userEmail) => {
    const emailRegexp = /\S+@\S+\.\S+/;
    return emailRegexp.test(userEmail);
  };

  const handleSubmit = async () => {
    const passwordHash = md5(password);
    const content = await registerCustomerUser(
      { name, email, password: passwordHash },
    );

    if (content.message) {
      const errorMessage = document.querySelector('#error');
      errorMessage.innerHTML = content.message;
      errorMessage.style.display = 'block';
      return true;
    }

    return navigate('/customer/products');
  };

  useEffect(() => {
    if (
      name.length >= EMAIL_LENGTH
      && password.length >= PASSWORD_LENGTH
      && validateEmail(email)
    ) {
      setFormValidation(false);
    } else {
      setFormValidation(true);
    }
  }, [name, email, password]);

  return (
    <main>
      <div>
        <form>
          <label htmlFor="name">
            <input
              type="text"
              required
              minLength={ 12 }
              placeholder="Seu Nome"
              name="name"
              onChange={ ({ target: { value } }) => setName(value) }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              required
              placeholder="seu-email@site.com.br"
              name="email"
              onChange={ ({ target: { value } }) => setMail(value) }
              data-testid="common_register__input-email"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              required
              minLength={ 6 }
              placeholder="Sua Senha"
              name="password"
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="common_register__input-password"
            />
          </label>
          <button
            type="button"
            data-testid="common_register__button-register"
            disabled={ formValidation }
            onClick={ handleSubmit }
          >
            CADASTRAR
          </button>
        </form>
        <p
          data-testid="common_register__element-invalid_register"
          id="error"
          style={ { display: 'none' } }
        >
          Error
        </p>
      </div>
    </main>
  );
}

export default Register;
