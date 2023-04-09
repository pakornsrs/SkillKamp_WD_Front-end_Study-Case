import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/global/NavbarHeader.js';
import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Footer from './components/global/Footer.js';
import SingInOut from './components/pages/SingInOut.js';

import './css/App.css';

function App() {

  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [webToken, setWebToken] = useState(null);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let webToken = localStorage.getItem("webToken");

    if (userId != null && webToken != null) {
      setUsername(username);
      setUserId(userId);
      setWebToken(webToken);
    }
  }, [username]);

  const userSignOut = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("webToken");

    setUsername(null)

  }


  return (
    <div>
      <Navbar username={username} userSignOut={userSignOut} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SingInOut setNewUSername = {setUsername}/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
