import React from 'react';
import Header from '../components/Header'
import CollectProvider from '../context/CollectProvider';
import RegisterForms from '../components/RegisterForms';

function Register() {
  return (
    <CollectProvider>
      <Header />
      <RegisterForms />
    </CollectProvider>
  );
}

export default Register;