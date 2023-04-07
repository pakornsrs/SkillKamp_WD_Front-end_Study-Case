import React from 'react';
import '../css/SingInOut.css';
import { useHistory } from 'react-router-dom';
import {LogoFacebook,LogoPinterest,LogoInstagram, Result} from '@carbon/icons-react'

const SignIn =()=>{

    const CancelClick =() =>{
        
    }

    return(
        <div className='login-form-container'>
            <div className='title-signin'>
                <p>Sign-In</p>
            </div>
            <div className='input-username-container'>
                <p id='input-label'>Username : </p>
                <input className='signin-input' type='text'/>
            </div>
            <div className='input-password-container'>
                <p id='input-label'>Password : </p>
                <input className='signin-input' type='password'/>
            </div>
            <div className='button-container'>
                <button id='button-signin'>Sign In</button>
                <button id='button-signin' onClick={CancelClick} >Cancel</button>
            </div>

            <div className='no-account'>
                <a>Don't have an account ? &nbsp;</a>
                <a>Signup now</a>
            </div>
        </div>
    )
}

export default SignIn;