import React from 'react';
import '../../css/SingInOut.css';
import SignIn from '../SignIn';

const SingInOut =(props)=>{

    return(
        <div className='page-container'>
            <SignIn setNewUSername = {props.setNewUSername} updateCartItem = {props.updateCartItem}/>
        </div>
    );
}

export default SingInOut;