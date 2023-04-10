import React, { Component, useEffect, useState } from 'react';
import '../../css/CartItem.css'
import CartItemCard from '../CartItemCard';

const CartItem = (props) => {

    const [cartItem,setCartItem] = useState(null);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {

        if(cartItem != null){
            setTotalPrice(sumTotalPrice())
        }

    }, [cartItem]);

    const sumTotalPrice = () => {

        let sum = 0;

        for(let i = 0 ; i < cartItem.length; i++){
            sum =  sum+  cartItem[i].price
        }

        return sum;
    }

    return (
        <div className='cart-item-main-container'>
            
            <div className='cart-item-content-container'>
                <div className='cart-modal-header-container'>
                    <p id='cart-modal-header'>Cart Item</p>
                </div>
                <div className='cart-item-header-container'>
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
                        <p id='cart-table-header'>Quantity</p>
                    </div>
                    <div className='header-Remove'>
                        <p id='cart-table-header'>Remove</p>
                    </div>
                </div>
                <div className='cart-item-card-container'>
                    <CartItemCard setCartItem = {setCartItem} updateCartItem = {props.updateCartItem}/>
                </div>
                <div className='cart-item-total-container'>
                    <p id='total-amount'>Total Price : </p>
                    <p id='total-amount'>{ totalPrice + "฿"}</p>
                </div>
                <div className='cart-item-button-container'>
                    <button className='cart-btn' id='cart-btn-place-order'>PLACE ORDER</button>
                    <button className='cart-btn' id='cart-btn-cancel' onClick={() => props.setShowCartItem(false)}>CANCEL</button>
                </div>
            </div>

        </div>
    )
}

export default CartItem;