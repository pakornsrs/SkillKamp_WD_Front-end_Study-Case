import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/pages/Home.js';
import Navbar from './components/navbar/Navbar.js';
import './css/App.css';

function App() {
  return (
    <div>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
