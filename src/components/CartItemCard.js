import React, { Component, useEffect, useState } from 'react';
import '../css/CartItemCard.css'
import { TrashCan, AddComment, ThumbsUpFilled, ThumbsDownFilled } from '@carbon/icons-react'
import axios from 'axios';
import service from '../config/service_path.json'
import ReviewModel from './ReviewModel';

const CartItemCard = (props) => {

    const [productCartIrem, setProductCartIrem] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false)

    const [selectProductReviewIrem, setSelectProductReviewIrem] = useState(null);

    useEffect(() => {

        let userId = localStorage.getItem("userId");

        if (userId != null && (props.mode == "displayCart" || props.mode == "summary")) {
            loadCartITem();
        }
        else if (userId != null && props.mode == "purchasedHistory") {
            loadCartITemHistory();
        }
    }, []);

    const loadCartITem = () => {

        let userId = localStorage.getItem("userId");

        if (userId != null && (props.mode == "displayCart" || props.mode == "summary")) {
            let path = service.BasePath + service.GetAllCartItem;
            let body = ""
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            body = JSON.stringify({
                "userId": userId
            })

            axios.post(path, body, config).then(res => {
                if (!res.data.tsError) {
                    setProductCartIrem(res.data.item)

                    if (props.mode == "displayCart") {
                        props.setCartItem(res.data.item)
                    }
                }
            }).catch((res) => {

                if(res.response.status == 401){
                    props.handlerUnauthorized();
                }

            });
        }
    }

    const loadCartITemHistory = () => {

        let userId = localStorage.getItem("userId");

        if (userId != null && props.mode == "purchasedHistory") {
            let path = service.BasePath + service.GetPurchastHistory;
            let body = ""
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            body = JSON.stringify({
                "userId": userId
            })

            axios.post(path, body, config).then(res => {
                if (!res.data.isError) {
                    setProductCartIrem(res.data.item)
                }
            }).catch((res) => {

                if(res.response.status == 401){
                    props.handlerUnauthorized();
                }

            });
        }
    }

    const products = productCartIrem;
    const myArray = Object.keys(products).map(key => {
        return { key: key, value: products[key] };
    });

    const removeItemFromCart = (item) => {

        let path = service.BasePath + service.RemoveCartItem;
        let body = ""

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("webToken")
            }
        }

        body = JSON.stringify({
            "cartItemId": item.cartItemId
        })

        axios.post(path, body, config).then(res => {
            if (!res.data.tsError) {
                props.updateCartItem();
                loadCartITem();
                //setProductCartIrem([])
            }
        }).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });
    }

    const addMoreItemToCart = (item) => {

        let path = service.BasePath + service.AddMoreCartItem;
        let body = ""

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("webToken")
            }
        }

        body = JSON.stringify({
            "cartItemId": item.cartItemId,
            "quantiry": 1
        })

        axios.post(path, body, config).then(res => {
            if (!res.data.tsError) {
                props.updateCartItem();
                loadCartITem();
                // setProductCartIrem([])
            }
        }).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });
    }

    const reduceItemFromCart = (item) => {

        let path = service.BasePath + service.ReduceCartItem;
        let body = ""

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("webToken")
            }
        }

        body = JSON.stringify({
            "cartItemId": item.cartItemId,
            "quantiry": 1
        })

        axios.post(path, body, config).then(res => {
            if (!res.data.tsError) {
                props.updateCartItem();
                loadCartITem();
                // setProductCartIrem([])
            }
        }).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });
    }

    return (
        <div className='cart-card-container'>
            {
                myArray.length > 0 ?
                    myArray.map((data) => (
                        <div key={data.key} className='cart-item-card'>
                            <div className='cart-number-contaainer'>
                                <p id='cart-item-number'>{Number(data.key) + 1}</p>
                            </div>
                            <div className='cart-image-contaainer'>
                                <img src={require('../Assets/Product/' + data.value.imagePath + '.png')} />
                            </div>
                            <div className='cart-detail-contaainer'>
                                <p id='cart-product-name'>{data.value.productNameEn}</p>
                                <p id='cart-product-descrip'>{data.value.descEn}</p>
                                <div className='color-size-container'>
                                    <div className='cart-color-container'>
                                        <div id='card-display-color' style={{ backgroundColor: data.value.colorCode, borderColor: data.value.colorId === 1 ? "#DADADA" : data.value.colorCode }}></div>
                                        <p id='color-desc'>{data.value.colorDescEn}</p>
                                    </div>
                                    <div className='cart-size-container'>
                                        <p id='size-desc'>{"Size : " + data.value.sizeDescEn}</p>
                                        <p id='size-desc-mobile'>{data.value.sizeDescEn}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='cart-price-contaainer'>
                                <p id='product-price-cart'>{data.value.price}</p>
                            </div>
                            <div className='cart-quatity-contaainer'>
                                <button id='button-quantity' onClick={() => reduceItemFromCart(data.value)} style={{ display: props.mode != "displayCart" && 'none' }}>-</button>
                                <input id='input-quantity' type='number' disabled value={data.value.quantity} style={{ display: (props.mode == "purchasedHistory") && 'none' }}></input>
                                <button id='button-quantity' onClick={() => addMoreItemToCart(data.value)} style={{ display: props.mode != "displayCart" && 'none' }}>+</button>
                                <div className='purchast-date-time'>
                                    <p>{data.value.purchastDate}</p>
                                    <p>{data.value.purchastTime}</p>
                                </div>
                            </div>
                            <div className='cart-action-contaainer'>
                                <button id='button-delete' onClick={() => removeItemFromCart(data.value)} style={{ display: props.mode != "displayCart" && 'none' }}>
                                    <TrashCan size="32" />
                                </button>
                                {
                                    props.mode == "purchasedHistory" &&
                                    <React.Fragment>
                                        {
                                            data.value.isReview ?
                                                <React.Fragment>
                                                    {
                                                        data.value.reviewDetail.isRecomment ?
                                                            <div className='reviewed-container'>
                                                                <ThumbsUpFilled size="32" style={{ color: '#66dd66' }} />
                                                                <p>Recommend</p>
                                                            </div>
                                                            :
                                                            <div className='reviewed-container'>
                                                                <ThumbsDownFilled size="32" style={{ color: '#ff6961' }} />
                                                                <p>Not Recommend</p>
                                                            </div>
                                                    }
                                                </React.Fragment>
                                                :

                                                <div className='reviewed-container'>
                                                    <button id='button-add-review' onClick={() => { setSelectProductReviewIrem(data.value); setShowReviewModal(true) }}>
                                                        <AddComment size="24" />
                                                    </button>
                                                    <p>Review</p>
                                                </div>
                                        }
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    ))
                    :
                    <div className='not-found-record'>
                        <p>
                            {props.mode == "displayCart" ? "No Cart Item" : "No Purchast History Record"}
                        </p>
                    </div>
            }
            {showReviewModal && <ReviewModel setShowReviewModal={setShowReviewModal} selectProductReviewIrem={selectProductReviewIrem} loadCartITemHistory = {loadCartITemHistory}/>}
        </div>
    )
}

export default CartItemCard;