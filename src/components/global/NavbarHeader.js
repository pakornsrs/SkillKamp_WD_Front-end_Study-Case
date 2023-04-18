import React, { Component, useEffect, useState } from 'react';
import '../../css/Navbar.css';
import { UserAvatar, Menu, ShoppingCart, Email } from '@carbon/icons-react'
import CartItem from '../pages/CartItem';
import ModalBase from './ModalBase';

const NavbarHeader = (props) => {

    const [userDropdownActive, setUserDropdownActive] = useState(false);
    const [emailDropdownActive, setEmailDropdownActive] = useState(false);
    const [userCartItemCount, setUserCartItemCount] = useState(0);
    const [userCouponCount, setUserCouponCount] = useState(0);

    const [showCartItem, setShowCartItem] = useState(false);
    const [showHamItem, setShowHamItem] = useState(false);
    const [cartItemMode, setCartItemMode] = useState("displayCart");

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

    const [couponItem, setCouponItem] = useState([]);

    useEffect(() => {

        if(localStorage.getItem("userId") != null){
            props.updateCouponItem();
        }
    }, []);

    useEffect(() => {

        setUserCartItemCount(props.cartItemCount)

    }, [props.cartItemCount]);

    useEffect(() => {

        setUserCouponCount(props.couponItem.length)

        const myArray = Object.keys(props.couponItem).map(key => {
            return { key: key, value: props.couponItem[key] };
        });

        setCouponItem(myArray);

    }, [props.couponItem]);

    const mouseOverUsername = () => {
        setUserDropdownActive(true)
    }

    const mouseOutUsername = () => {
        setUserDropdownActive(false)
    }

    const UsernameToggle = () => {

        let status = userDropdownActive;
        setUserDropdownActive(!status)

        setShowHamItem(false)
        setEmailDropdownActive(false)
    }

    const EmailToggle = (code) => {

        let status = emailDropdownActive;
        setEmailDropdownActive(!status)

        setUserDropdownActive(false)
        setShowHamItem(false)

        if(code != null && code != undefined && code.trim().length > 0){
            navigator.clipboard.writeText(code);
        }
    }

    const userSignOut = () => {
        props.userSignOut();
    }

    const HamItemToggle = () => {

        let status = showHamItem;
        setShowHamItem(!status)

        setEmailDropdownActive(false)
        setUserDropdownActive(false)
    }

    const openItemCart = (mode) => {

        if (mode == "displayCart") {

            setCartItemMode("displayCart")

            if (props.cartItemCount < 1) {
                setModalData({ "title": "Cart Items", "message": "Cart is empty.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)
                return;
            }

            setShowCartItem(true)
        }
        else {
            setCartItemMode("purchasedHistory")
            setShowCartItem(true)
        }

    }


    return (
        <div className='header-navbar-container'>
            <div className='header-container'>
                <p id='brand-named'>happy kid</p>
            </div>
            <div className="navbar">
                <ul className="links">
                    <li><a id='main-menu' href="/">Home</a></li>
                    <li><a id='main-menu' href="/shop">Shop Collection</a></li>
                    <li><a id='main-menu' href="Home">Our Story</a></li>
                    <li><a id='main-menu' href="/contact">Contact</a></li>
                </ul>
                <div className='signin-container'>
                    <UserAvatar style={{ margin: '10px' }} size="32" />
                    <a href="/sign-in" className="action-btn" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }}>Sign In</a>
                    <a href="#" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }}> / </a>
                    <a className="action-btn" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }} >Sign Up</a>
                    <p id='username' onClick={UsernameToggle} >{props.username}</p>
                    <div className='shopping-cart-container'>
                        <ShoppingCart id='shopping-cart' size="32" className='shoping-cart' onMouseDown={() => openItemCart("displayCart")} />
                        <div className='counting-container' style={{ display: userCartItemCount <= 0 ? 'none' : 'flex' }}>{userCartItemCount}</div>
                    </div>
                    <div className='shopping-cart-container'>
                        <Email id='e-mail' size="32" onMouseDown={() => EmailToggle()} />
                        <div className='coupon-counting-container' style={{ display: userCouponCount <= 0 || userCouponCount == undefined ? 'none' : 'flex' }}>{userCouponCount}</div>
                    </div>
                    <div className='username-dropdown' onClick={UsernameToggle} style={{ display: userDropdownActive ? 'flex' : 'none' }}>
                        <ul className="username-dropdown-list">
                            <li><a id='link-ham' onClick={UsernameToggle} href="#">My Profile</a></li>
                            <li><a id='link-ham' onClick={() => openItemCart("purchasedHistory")} href="#">Purchased History</a></li>
                            <li><a id='link-ham' href="#" onClick={userSignOut}>Sign Out</a></li>
                        </ul>
                    </div>
                    <div className='username-dropdown' style={{ display: emailDropdownActive ? 'flex' : 'none' }}>
                        <ul className="username-dropdown-list">
                            {
                                couponItem.length > 0 &&
                                couponItem.map((data) => (
                                    // <li key={data.key} id='coupon-ham' >{data.value.couponCode}</li>
                                    <li key={data.key} id='coupon-ham'onClick={() => EmailToggle(data.value.couponCode)}>
                                        <div className='coupon-detail-container'>
                                            <p id='coupon-detail' style={{color : data.value.type == 1 ? 'white' : 'yellow'}}>{data.value.couponCode}</p>
                                            <p id='coupon-detail' style={{color : data.value.type == 1 ? 'white' : 'yellow'}}>{data.value.expireDateText}</p>
                                        </div>
                                        <div className='coupon-detail-container'>
                                            <p id='coupon-detail' style={{color : data.value.type == 1 ? 'white' : 'yellow'}}>{data.value.type == 1 ? "For you" : "For all"}</p>
                                            <p id='coupon-detail' style={{color : data.value.type == 1 ? 'white' : 'yellow'}}>{"Limit : "+ data.value.useCount + "/" + data.value.limitation}</p>
                                        </div>
                                    </li>
                                    
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="toggle-btn">
                    <Menu size="32" onClick={HamItemToggle} />
                    <div className='ham-menu' style={{ display: showHamItem && 'flex' }}>
                        <a id='link-ham' onClick={HamItemToggle} href="/">Home</a>
                        <a id='link-ham' onClick={HamItemToggle} href="/shop">Shop Collection</a>
                        <a id='link-ham' onClick={HamItemToggle} href="Home">Our Story</a>
                        <a id='link-ham' onClick={HamItemToggle} href="/contact">Contact</a>

                    </div>
                </div>
            </div>
            {showCartItem && <CartItem setShowCartItem={setShowCartItem} updateCartItem={props.updateCartItem} mode={cartItemMode} handlerUnauthorized = {props.handlerUnauthorized}/>}
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </div>

    );
}

export default NavbarHeader;