import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/global/NavbarHeader.js';
import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Footer from './components/global/Footer.js';
import SingInOut from './components/pages/SingInOut.js';
import Shopping from './components/pages/Shopping.js';
import PlaceOrder from './components/pages/PlaceOrder.js';
import SignUp from './components/SignUp.js';
import axios from 'axios';
import service from './config/service_path.json'
import './css/App.css';

function App() {

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [webToken, setWebToken] = useState(localStorage.getItem("webToken"));

  const [cartItemCount, setCartItemCount] = useState(0);
  const [confirmPlaceOrder, setConfirmPlaceOrder] = useState(null)

  const [couponItem, setCouponItem] = useState([]);

  useEffect(() => {

    let userId = localStorage.getItem("userId");

    if (userId != null) {
      updateCartItem();
      // updateCouponItem();
    }
  }, []);


  const updateCartItem = () =>{
    
    let userId = localStorage.getItem("userId");

      if(userId != null){
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

      try {
          axios.post(path, body, config).then(((res) => {
          setCartItemCount(res.data.item)
        }));
      }
      catch {

      }
      }
  }

  const updateCouponItem = () =>{
    let userId = localStorage.getItem("userId");

      let path = service.BasePath + service.GetUserCoupon;
      let body = "";

      body = JSON.stringify({
        "userId": userId,
      })

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      try {
          axios.post(path, body, config).then(((res) => {
            setCouponItem(res.data.item)
        }));
      }
      catch {

      }
  }
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
    setCartItemCount(0)
    setCouponItem([])

  }

  return (
    <div>
      <Navbar username={username} userSignOut={userSignOut} cartItemCount={cartItemCount} updateCartItem ={updateCartItem} couponItem = {couponItem} updateCouponItem={updateCouponItem}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home cartItemCount={cartItemCount} setCartItem={setCartItemCount}  updateCartItem ={updateCartItem} updateCouponItem = {updateCouponItem} />}/>
          <Route path='/home' element={<Home cartItemCount={cartItemCount} setCartItem={setCartItemCount} updateCartItem ={updateCartItem} updateCouponItem = {updateCouponItem}/>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SingInOut setNewUSername={setUsername} updateCartItem={updateCartItem} updateCouponItem={updateCouponItem}/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/shop' element={<Shopping cartItemCount={cartItemCount} setCartItem={setCartItemCount} />} />
          <Route path='/order'element={<PlaceOrder/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
