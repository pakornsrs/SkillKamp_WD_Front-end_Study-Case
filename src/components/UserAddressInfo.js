import React, { useState } from 'react';
import '../css/UserAddressInfo.css'

const UserAddressInfo = (props) => {

    const addressLine1 = (event) =>{
        props.setUserAddress1(event.target.value)
    }

    const addressLine2 = (event) =>{
        props.setUserAddress2(event.target.value)
    }

    const addressSubDistric = (event) =>{
        props.setUserSubDistrict(event.target.value)
    }

    const addressDistric = (event) =>{
        props.setUserDistrict(event.target.value)
    }

    const addressProvince = (event) =>{
        props.setUserProvince(event.target.value)
    }

    const addressZipCode = (event) =>{
        props.setUserZipCode(event.target.value)
    }

    return (
        <React.Fragment>
            <div className='input-container'>
                <p id='input-label'>Address detail : </p>
                <input className='signin-input' type='text' placeholder='line 1' onChange={addressLine1} value={props.userAddress1}/>
                <input className='signin-input' type='text' placeholder='line 2' style={{marginTop:'10px'}} onChange={addressLine2} value={props.userAddress2}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>Sub-District : </p>
                <input className='signin-input' type='text' onChange={addressSubDistric} value={props.userSubDistrict}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>District : </p>
                <input className='signin-input' type='text' onChange={addressDistric} value={props.userDistrict}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>Provicne : </p>
                <input className='signin-input' type='text' onChange={addressProvince} value={props.userProvince}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>Zip Code : </p>
                <input className='signin-input' type='text' onChange={addressZipCode} value={props.userZipCode}/>
            </div>
        </React.Fragment>
    )
}

export default UserAddressInfo;