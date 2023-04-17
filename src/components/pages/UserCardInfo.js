import React from 'react';
import '../../css/UserCardInfo.css'

const UserCardInfo = (props) => {

    const cardNumber = (event) =>{
        props.setUserCardNumber(event.target.value)
    }

    const nameOnCard = (event) =>{
        props.setNameOnCard(event.target.value)
    }

    const expireDate = (event) =>{
        let newDate = new Date(event.target.value)
        props.setCardExpireDate(event.target.value)
        props.setCardExpireDateUnix(newDate.getTime())
    }

    const cardCvv = (event) =>{
        props.setCVV(event.target.value)
    }

    return (
        <React.Fragment>
            <div className='input-container'>
                <p id='input-label'>Card Number : </p>
                <input className='signin-input' type='number' value={props.userCardNumber} pattern="\d{0,16}"  onChange={cardNumber}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>Name on Card : </p>
                <input className='signin-input' type='text' value={props.nameOnCard} onChange={nameOnCard}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>Expire Date : </p>
                <input className='signin-input' type='date' value={props.cardExpireDate} onChange={expireDate}/>
            </div>
            <div className='input-container'>
                <p id='input-label'>CVV : </p>
                <input className='signin-input' type='password' value={props.cvv} maxLength="3" onChange={cardCvv}/>
            </div>
        </React.Fragment>
    )
}

export default UserCardInfo;