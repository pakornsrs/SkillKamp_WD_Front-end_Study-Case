import React, {  useEffect, useState } from 'react';
import '../../css/CartItem.css'
import CartItemCard from '../CartItemCard.js'

const CartItem = (props) => {

    const [cartItem, setCartItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        if (cartItem != null && props.mode == "displayCart") {
            setTotalPrice(sumTotalPrice())
        }

    }, [cartItem]);

    const sumTotalPrice = () => {

        let sum = 0;

        for (let i = 0; i < cartItem.length; i++) {
            sum = sum + cartItem[i].price
        }

        return sum;
    }

    const navigateToPlaceOrder = () => {

    }

    return (
        <div className='cart-item-main-container'>

            <div className='cart-item-content-container'>
                <div className='cart-modal-header-container'>
                    <p id='cart-modal-header'>
                        {props.mode == "displayCart" ? "Cart Items" : "Purchast History"}
                    </p>
                </div>
                <div className='cart-item-header-container' style={{width:props.mode != "displayCart" && '94%'}}>
                    <div className='header-no'>
                        <p id='cart-table-header'>NO.</p>
                    </div>
                    <div className='header-img'>
                        <p id='cart-table-header'>Image</p>
                    </div>
                    <div className='header-detail'>
                        <p id='cart-table-header'>Product Detail</p>
                    </div>
                    <div className='header-price'>
                        <p id='cart-table-header'>Total Price</p>
                    </div>
                    <div className='header-qty'>
                        <p id='cart-table-header'>
                            {props.mode == "displayCart" ? "Quantity" : "Date"}
                        </p>
                    </div>
                    <div className='header-Remove'>
                        <p id='cart-table-header'>
                            {props.mode == "displayCart" ? "Remove" : "Review"}
                        </p>
                    </div>
                </div>
                <div className='cart-item-card-container'>
                    <CartItemCard setCartItem={setCartItem} updateCartItem={props.updateCartItem} mode={props.mode} handlerUnauthorized = {props.handlerUnauthorized}/>
                </div>
                <div className='cart-item-total-container' style={{display: props.mode != "displayCart" && 'none'}}>
                    <p id='total-amount'>Total Price : </p>
                    <p id='total-amount'>{totalPrice + "฿"}</p>
                </div>
                <div className='cart-item-button-container' style={{ display: props.mode != "displayCart" && 'none' }}>
                    <a href='/order'>
                        <button className='cart-btn' id='cart-btn-place-order' onClick={navigateToPlaceOrder}>PLACE ORDER</button>
                    </a>
                    <button className='cart-btn' id='cart-btn-cancel' onClick={() => props.setShowCartItem(false)}>CANCEL</button>
                </div>
                <div className='cart-item-button-container' style={{ display: props.mode != "purchasedHistory" && 'none', marginTop:'35px' }}>
                    <button className='cart-btn' id='cart-btn-place-order' onClick={() => props.setShowCartItem(false)}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;