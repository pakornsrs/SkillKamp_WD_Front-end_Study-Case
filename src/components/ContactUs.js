import React, { Component  } from 'react';


const ContactUs =()=>{
    
    return(
        <div className='contact-container'>
            <div className='contact-header'>Contact Us</div>
            <div className='contact-body'>
                <div className='contace-detail-container'>
                    <p>500 Terry Francois St.</p>
                    <p>San Francisco, CA 94158</p>
                    <p>123-456-7890</p>
                </div>
                <div className='contace-detail-container'>
                    <p>Mon - Fri: 7am - 10pm</p>
                    <p>​​Saturday: 8am - 10pm</p>
                    <p>​Sunday: 8am - 11pm</p>
                </div>
                <div className='contace-detail-container'>
                    <p>1-800-000-000</p>
                    <p>123-456-7890</p>
                    <p>info@mysite.com</p>
                </div>
            </div>

        </div>
    );
}

export default ContactUs;