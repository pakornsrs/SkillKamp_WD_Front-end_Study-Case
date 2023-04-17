import React from 'react'
import ContactUs from '../ContactUs';
import ContactForm from '../ContactForm';
import '../../css/Contact.css'


const Contact = () =>{

    return(
        <div className='contact-page-container'>
            <ContactUs/>
            <ContactForm/>
        </div>
        
    )
}

export default Contact;