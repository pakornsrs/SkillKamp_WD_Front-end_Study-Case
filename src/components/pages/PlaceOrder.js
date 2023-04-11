import React, { Component, useEffect, useState } from 'react';
import '../../css/PlaceOrder.css'
import axios from 'axios';
import service from '../../config/service_path.json'
import CartItemCard from '../CartItemCard';

import { Tag } from '@carbon/icons-react'
import SlideShow from '../SlideShow';


const PlaceOrder = () => {

    const disableScrollBar = () =>{

        document.body.style.overflow = 'hidden';
    }

    const enableScrollBar = () =>{
        document.body.style.overflow = 'auto';
    }

    return (
        <React.Fragment>
            <div className='main-place-order-page'>
            <div className='order-header-container'>
                <p id='order-summary-header'>Order Summary</p>
            </div>
            <div className='main-detail-container'>
                <div className='order-product-detail-container'>
                    <div className='list-order-item-container'>
                        <div className='order-item-header-container'>
                            <div className='order-header-no'>
                                <p id='order-table-header'>NO.</p>
                            </div>
                            <div className='order-header-img'>
                                <p id='order-table-header'>Image</p>
                            </div>
                            <div className='order-header-detail'>
                                <p id='order-table-header'>Product Detail</p>
                            </div>
                            <div className='order-header-price'>
                                <p id='order-table-header'>Total Price</p>
                            </div>
                            <div className='order-header-qty'>
                                <p id='order-table-header'>Quantity</p>
                            </div>
                        </div>
                    </div>
                    <div className='order-item-card-container' onMouseOver={disableScrollBar} onMouseLeave={enableScrollBar}>
                        <CartItemCard setCartItem={null} updateCartItem={null} enableEdit={false} />
                    </div>
                </div>

                <div className='payment-deliver-detail-container'>
                    <p id='payment-summary-title'>Payment and Deliver</p>
                    <div className='price-summary-container'>
                        <div className='price-summary-container-line'>
                            <p id='order-total-amount'>Total Amount:</p>
                            <p id='order-total-amount-full-amount'>10000 ฿</p>
                        </div>
                        <div className='price-summary-container-line'>
                            <p id='order-total-amount'>Discount (15%) :</p>
                            <p id='order-total-amount-full-amount'>1500 ฿</p>
                        </div>
                        <div className='price-summary-container-line'>
                            <p id='order-total-amount'>Total Amount:</p>
                            <p id='order-total-amount-full-amount' >8500 ฿</p>
                        </div>
                    </div>
                    <div className='input-coupon-container'>
                        <input id='coupon-input' type='text' placeholder='Enter discount code' />
                        <button id='coupon-input-button'>Process</button>
                    </div>
                    <div className='payment-method-container'>
                        <p id='payment-method-header'>Payment Method</p>
                        <div className="order-dropdown">
                            <button className="order-dropbtn">Select Payment Methods</button>
                            <div className="order-dropdown-content">
                                <p id='drop-down-choise'>Cash on delivery</p>
                                <p id='drop-down-choise'>Debit/Credit Card</p>

                            </div>
                        </div>
                        <div className="order-dropdown">
                            <button className="order-dropbtn">Select Your Cards</button>
                            <div className="order-dropdown-content">
                                <p id='drop-down-choise'>Cash on delivery</p>
                                <p id='drop-down-choise'>Debit/Credit Card</p>

                            </div>
                        </div>
                    </div>
                    <div className='payment-method-container'>
                        <p id='payment-method-header'>Deliver Address</p>
                        <div className="order-dropdown">
                            <button className="order-dropbtn">Select Your Address</button>
                            <div className="order-dropdown-content">
                                <p id='drop-down-choise'>Other</p>

                            </div>
                        </div>
                        <textarea type="text" id='other-address' />
                    </div>

                    <div className='button-container'>
                        <button id='order-button-ok'>Confirm</button>
                        <div className='button-container-sub'>
                            <button id='order-button'>Cancel Order</button>
                            <button id='order-button'>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default PlaceOrder;