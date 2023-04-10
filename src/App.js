import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/global/NavbarHeader.js';
import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Footer from './components/global/Footer.js';
import SingInOut from './components/pages/SingInOut.js';
import Shopping from './components/pages/Shopping.js';
import axios from 'axios';
import service from './config/service_path.json'

import './css/App.css';

function App() {

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [webToken, setWebToken] = useState(localStorage.getItem("webToken"));

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    console.log("On load get count")
    if(userId != null){
      
      console.log("OGet in")
      let userId = localStorage.getItem("userId");

    let path = service.BasePath + service.GetCartCount;
    let body = "";

    body = JSON.stringify({
    "userId": userId,
    })

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try{
        axios.post(path, body, config).then(((res) => {
            setCartItemCount(res.data.item)
        }));
    }
    catch{

    }
    }
  }, []);


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
      <Navbar username={username} userSignOut={userSignOut} cartItemCount = {cartItemCount}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home setCartItemCount = {setCartItemCount} cartItemCount = {cartItemCount} setCartItem = {setCartItemCount} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SingInOut setNewUSername = {setUsername}/>} />
          <Route path='/shop' element={<Shopping setCartItemCount = {setCartItemCount} cartItemCount = {cartItemCount} setCartItem = {setCartItemCount}/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
