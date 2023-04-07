import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './components/global/NavbarHeader.js';
import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Footer from './components/global/Footer.js';
import SingInOut from './components/pages/SingInOut.js';

import './css/App.css';

function App() {
  return (
    <div>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/sign-in' element={<SingInOut/>} />
      </Routes>
    </BrowserRouter>
    <Footer/>
  </div>
  );
}

export default App;
