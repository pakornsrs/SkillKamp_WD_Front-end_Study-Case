import React from 'react';
import '../../css/SingInOut.css';
import SignIn from '../SignIn';
import {LogoFacebook,LogoPinterest,LogoInstagram} from '@carbon/icons-react'

const SingInOut =()=>{

    return(
        <div className='page-container'>
            <SignIn/>
        </div>
    );
}

export default SingInOut;