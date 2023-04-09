import React, { Component, useEffect, useState } from 'react';
import '../../css/Navbar.css';
import { UserAvatar, Menu, ShoppingCart, Email } from '@carbon/icons-react'

const NavbarHeader = (props) => {

    console.log(props.username)
    const [userDropdownActive, setUserDropdownActive] = useState(false);

    const mouseOverUsername = () => {
        setUserDropdownActive(true)
    }

    const mouseOutUsername = () => {
        setUserDropdownActive(false)
    }

    const userSignOut = () => {
        props.userSignOut();
    }

    return (
        <div className='header-navbar-container'>
            <div className='header-container'>
                <a href="#" id='brand-named'>Happy Kid</a>
            </div>
            <div className="navbar">
                <ul className="links">
                    <li><a href="Home">Home</a></li>
                    <li><a href="Home">Shop Collection</a></li>
                    <li><a href="Home">Our Story</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div className='signin-container'>
                    <UserAvatar style={{ margin: '10px' }} size="32" />
                    <a href="/sign-in" className="action-btn" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }}>Sign In</a>
                    <a href="#" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }}> / </a>
                    <a className="action-btn" style={{ display: props.username == null || props.username == undefined ? 'flex' : 'none' }} >Sign Up</a>
                    <p id='username' onMouseOver={mouseOverUsername} >{props.username}</p>
                    <div className='shopping-cart-container'>
                        <ShoppingCart size="32" className='shoping-cart' />
                        <div className='counting-container'>2</div>
                    </div>
                    <div className='shopping-cart-container'>
                        <Email size="32" />
                        <div className='counting-container'>2</div>
                    </div>
                    <div className='username-dropdown' onMouseOver={mouseOverUsername} onMouseOut={mouseOutUsername} style={{ display: userDropdownActive ? 'flex' : 'none' }}>
                        <ul className="username-dropdown-list">
                            <li><a id='username-menu' href="#">My Profile</a></li>
                            <li><a id='username-menu' href="#">Purchased History</a></li>
                            <li><a id='username-menu' href="#" onClick={userSignOut}>Sign Out</a></li>
                        </ul>
                    </div>
                </div>
                <div className="toggle-btn">
                    <Menu size="32" />
                </div>
            </div>

        </div>

    );
}

export default NavbarHeader;