import React from 'react';
import '../../css/Navbar.css';
import {UserAvatar,Menu} from '@carbon/icons-react'

const NavbarHeader = () =>{

    return(
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
                    <UserAvatar style={{margin : '10px'}} size="32"/>
                    <a href="/sign-in" className="action-btn">Sign In</a>
                    <p href="#" className="action-btn"> / </p>
                    <a href="#" className="action-btn">Sign Up</a>
                </div>
                    
                <div className="toggle-btn">
                    <Menu size="32"/>
                </div>
                </div>  
        </div>

    );
}

export default NavbarHeader;