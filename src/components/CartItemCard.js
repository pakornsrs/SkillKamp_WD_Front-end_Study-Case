import React, { Component, useEffect, useState } from 'react';
import '../css/CartItemCard.css'
import { Star, StarFilled, StarHalf, TrashCan } from '@carbon/icons-react'
import axios from 'axios';
import service from '../config/service_path.json'

const CartItemCard = (props) => {

    const [productCartIrem, setProductCartIrem] = useState([]);

    useEffect(() => {

        let userId = localStorage.getItem("userId");

        if (userId != null) {
            let path = service.BasePath + service.GetAllCartItem;
            let body = ""
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "userId": userId
            })

            axios.post(path, body, config).then(res => {
                if (!res.data.tsError) {
                    setProductCartIrem(res.data.item)
                    props.setCartItem(res.data.item)
                }
            });
        }
    }, [productCartIrem]);

    useEffect(() => {

    }, []);

    const products = productCartIrem;
    const myArray = Object.keys(products).map(key => {
        return { key: key, value: products[key] };
    });

    const removeItemFromCart =(item) =>{
        
        let path = service.BasePath + service.RemoveCartItem;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "cartItemId": item.cartItemId
            })

            console.log(body)

            axios.post(path, body, config).then(res => {
                if (!res.data.tsError) {
                    props.updateCartItem();
                    setProductCartIrem([])
                }
            });
    }

    const addMoreItemToCart =(item) =>{
        
        let path = service.BasePath + service.AddMoreCartItem;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "cartItemId": item.cartItemId,
                "quantiry" : 1
            })

            console.log(body)

            axios.post(path, body, config).then(res => {
                if (!res.data.tsError) {
                    props.updateCartItem();
                    setProductCartIrem([])
                }
            });
    }

    const reduceItemFromCart =(item) =>{
        
        let path = service.BasePath + service.ReduceCartItem;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "cartItemId": item.cartItemId,
                "quantiry" : 1
            })

            console.log(body)

            axios.post(path, body, config).then(res => {
                if (!res.data.tsError) {
                    props.updateCartItem();
                    setProductCartIrem([])
                }
            });
    }

    return (
        <div className='cart-card-container'>
            {
                myArray.map((data) => (
                    <div key={data.key} className='cart-item-card'>
                        <div className='cart-number-contaainer'>
                            <p id='cart-item-number'>{Number(data.key) + 1}</p>
                        </div>
                        <div className='cart-image-contaainer'>
                            <img src={require('../Assets/Product/' + data.value.imagePath + '.png')} style={{ width: '100px', height: 'auto' }} />
                        </div>
                        <div className='cart-detail-contaainer'>
                            <p id='cart-product-name'>{data.value.productNameEn}</p>
                            <p id='cart-product-descrip'>{data.value.descEn}</p>
                            <div className='color-size-container'>
                                <div className='cart-color-container'>
                                    <div id='card-display-color' style={{ backgroundColor: data.value.colorCode, borderColor: data.value.colorId === 1 ? "#DADADA" : data.value.colorCode }}></div>
                                    <p  id='color-desc'>{data.value.colorDescEn}</p>
                                </div>
                                <div className='cart-size-container'>
                                    <p  id='size-desc'>{"Size : " + data.value.sizeDescEn}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cart-price-contaainer'>
                            <p id='product-price-cart'>{data.value.price}</p>
                        </div>
                        <div className='cart-quatity-contaainer'>
                            <button id='button-quantity' onClick={()=>addMoreItemToCart(data.value)}>+</button>
                            <input id='input-quantity' type='number' disabled value={data.value.quantity}></input>
                            <button id='button-quantity' onClick={()=>reduceItemFromCart(data.value)}>-</button>
                        </div>
                        <div className='cart-action-contaainer'>
                            <button id='button-delete' onClick={() => removeItemFromCart(data.value)}>
                                <TrashCan size="32" />
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default CartItemCard;