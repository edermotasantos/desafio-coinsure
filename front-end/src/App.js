import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import CustomerCheckout from './CustomerCheckout';
import Register from './pages/Register';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/Register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
