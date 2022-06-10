import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import CustomerCheckout from './CustomerCheckout';
import RegisterForms from './components/RegisterForms';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/Register" element={ <RegisterForms /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
