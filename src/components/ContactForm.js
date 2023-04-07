import React, { Component  } from 'react';

const ContactForm = () =>{

    return(

        <div className='header-form-container'>
            <div className='form-header'>
                <p>For any question, please send us a message.</p>
            </div>
            <form className='contact-form'>
            <div className='name-container'>
                <div className='label-input-container-name'>
                    <p>First Name : </p>
                    <input className='name-lastname-input' type="text" name="name" />
                </div>
                <div className='label-input-container-name'>
                    <p>Last Name : </p>
                    <input className='name-lastname-input' type="text" name="lastname" />
                </div>
            </div>
            <div className='label-input-container'>
                <p>E-Mail : </p>
                <input className='other-input' type="text" name="lastname" />
            </div>
            <div className='label-input-container'>
                <p>Subject : </p>
                <input className='other-input' type="text" name="subject" />
            </div>
            <div className='label-input-container'>
                <p>Message : </p>
                <textarea className='other-input' type="text-area" name="message" />
            </div>
                
            <div className='form-submit'>
                <button>Submit</button>
            </div>
        </form>
        </div>

    );
}

export default ContactForm;