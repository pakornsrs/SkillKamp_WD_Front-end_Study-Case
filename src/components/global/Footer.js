import React from 'react';
import '../../css/Footer.css';
import {LogoFacebook,LogoPinterest,LogoInstagram} from '@carbon/icons-react'

const Footer = () =>{
    return(
        <React.Fragment>
            <div className='footer-container'>
            <div className='footer-header'>
                <p>Happy kids</p>
            </div>
            <div className='footer-body'>
                <div className='footer-detail-container'>
                    <a>Home</a>
                    <a>Shop Collection</a>
                    <a>Story</a>
                    <a>Contact</a>
                </div>
                <div className='footer-social-container'>
                    <a href="https://www.facebook.com" target="_blank">
                        <LogoFacebook size="32" id='logo-fb'/>
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                        <LogoPinterest size="32" id='logo-pin'/>
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                    <LogoInstagram size="32" id='logo-ig'/>
                    </a>
                </div>
                <div className='footer-detail-container'>
                    <a>Shipping & Return</a>
                    <a>Store Policies</a>
                    <a>Payment Methods</a>
                    <a>FAQs</a>
                </div>
                <div className='footer-social-container mobile'>
                    <a href="https://www.facebook.com" target="_blank">
                        <LogoFacebook size="32" id='logo-fb'/>
                    </a>
                    <LogoPinterest size="32" id='logo-pin'/>
                    <LogoInstagram size="32" id='logo-ig'/>
                </div>
            </div>
            <div className='apply-noti'>
                <div className='mailing-header'>
                    <p>Join our mailing list</p>
                </div>
                <div className='submit-mail'>
                    <input type='text'/>
                    <button>Subscribe Now</button>
                </div>
            </div>

        </div>
        <div className='copyright-container'>
            <p> © Designed by SkillMap and developed by Pakorn Srisanguan</p>
        </div>
        </React.Fragment>
    )
}

export default Footer;