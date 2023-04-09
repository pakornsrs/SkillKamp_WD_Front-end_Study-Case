import React from 'react';
import '../../css/SingInOut.css';
import SignIn from '../SignIn';
import {LogoFacebook,LogoPinterest,LogoInstagram} from '@carbon/icons-react'

const SingInOut =(props)=>{

    return(
        <div className='page-container'>
            <SignIn setNewUSername = {props.setNewUSername}/>
        </div>
    );
}

export default SingInOut;