import React from 'react';
import Header from '../components/Header'
import CollectProvider from '../context/CollectProvider';
import LoginForms from '../components/LoginForms';

function Login() {
  return (
    <CollectProvider>
      <Header />
      <LoginForms />
    </CollectProvider>
  );
}

export default Login;
