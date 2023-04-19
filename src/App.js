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
import ModalBase from './components/global/ModalBase.js';
import service from './config/service_path.json'
import './css/App.css';

function App() {

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [webToken, setWebToken] = useState(localStorage.getItem("webToken"));

  const [cartItemCount, setCartItemCount] = useState(0);
  const [confirmPlaceOrder, setConfirmPlaceOrder] = useState(null)

  const [couponItem, setCouponItem] = useState([]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

  useEffect(() => {

    let webToken = localStorage.getItem("webToken");

    if (webToken != null) {
      tokenCheck()

    }

    let userId = localStorage.getItem("userId");

    if (userId != null) {
      updateCartItem();
    }
  }, []);

  const tokenCheck = () => {
    let userId = localStorage.getItem("userId");

    if (userId != null) {
      let path = service.BasePath + service.TokenCheck;

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("webToken")
        }
      }

      axios.get(path, config).then(((res) => {
        console.log("Token expire", res.data.item)
        setCartItemCount(res.data.item)
      })).catch((res) => {

        if (res.response.status == 401) {
          userSignOut();
        }

      });
    }
  }


  const updateCartItem = () => {

    let userId = localStorage.getItem("userId");

    if (userId != null) {
      let path = service.BasePath + service.GetCartCount;
      let body = "";

      body = JSON.stringify({
        "userId": userId,
      })

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("webToken")
        }
      }

      axios.post(path, body, config).then(((res) => {
        setCartItemCount(res.data.item)
      })).catch((res) => {

        if (res.response.status == 401) {
          userSignOut();
        }

      });
    }
  }

  const updateCouponItem = () => {
    let userId = localStorage.getItem("userId");

    let path = service.BasePath + service.GetUserCoupon;
    let body = "";

    body = JSON.stringify({
      "userId": userId,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("webToken")
      }
    }

    axios.post(path, body, config).then(((res) => {
      setCouponItem(res.data.item)
    })).catch((res) => {

      if (res.response.status == 401) {
        userSignOut();
      }

    });
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

  const displayModalBase = (title, message, type) => {

    setModalData({ "title": title, "message": message, "isShowImg": true, "showImageType": type })
    setIsShowModal(true)
  }

  const handlerUnauthorized = () => {

    if (localStorage.getItem("webToken") != null) {
      userSignOut();
      displayModalBase("Token Expire", "User token is expirem please login again.", "alert");
    }
    else {
      displayModalBase("Unauthorized", "Request is unalthorized please login.", "error");
    }

  }

  return (
    <div>
      <Navbar username={username} userSignOut={userSignOut} cartItemCount={cartItemCount} updateCartItem={updateCartItem} couponItem={couponItem} updateCouponItem={updateCouponItem} handlerUnauthorized={handlerUnauthorized} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home cartItemCount={cartItemCount} setCartItem={setCartItemCount} updateCartItem={updateCartItem} updateCouponItem={updateCouponItem} handlerUnauthorized={handlerUnauthorized} />} />
          <Route path='/home' element={<Home cartItemCount={cartItemCount} setCartItem={setCartItemCount} updateCartItem={updateCartItem} updateCouponItem={updateCouponItem} handlerUnauthorized={handlerUnauthorized} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<SingInOut setNewUSername={setUsername} updateCartItem={updateCartItem} updateCouponItem={updateCouponItem} />} handlerUnauthorized={handlerUnauthorized} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/shop' element={<Shopping cartItemCount={cartItemCount} setCartItem={setCartItemCount} handlerUnauthorized={handlerUnauthorized} />} />
          <Route path='/order' element={<PlaceOrder handlerUnauthorized={handlerUnauthorized} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
    </div>
  );
}

export default App;
