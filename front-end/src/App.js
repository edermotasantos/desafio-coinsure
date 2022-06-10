import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
