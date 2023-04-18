import React, { Component, useEffect, useState } from 'react';
import '../css/ProductDetailModal.css'
import { Star, StarFilled, StarHalf, Term } from '@carbon/icons-react'
import axios from 'axios'
import service from '../config/service_path.json'
import ModalBase from './global/ModalBase';

const ProductDetailModal = (props) => {

    const [imgPaht, setImgPhat] = useState(props.prodDefultDetail.defaultImgPaht);
    const [selectColor, setSelectColor] = useState({ "colorId": 0, "colorDesc": "Please select.", "colorCode": "" })
    const [isSelectColor, setIsSelectColor] = useState(false)
    const [selectSize, setSelectSize] = useState({ "sizeId": 0, "sizeDesc": "Please select." })
    const [isSelectSize, setIsSelectSize] = useState(false)
    const [showDropdownSizeList, setShowDropdownSizeList] = useState(false)

    const [quantity, setQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [finalSelectProduct, setFinalSelectProduct] = useState(null);

    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });
    const [isShowModal, setIsShowModal] = useState(false);


    useEffect(() => {

        if (selectSize.sizeId != 0) {
            finalProduct();
        }

    }, [selectColor]);

    useEffect(() => {

        if (selectColor.colorId != 0) {
            finalProduct();
        }

    }, [selectSize]);


    const mouseOverSizeList = () => {
        setShowDropdownSizeList(true)
    }

    const mouseOutSizeList = () => {
        setShowDropdownSizeList(false)
    }

    const onSelectSize = (selectedSize) => {

        setShowDropdownSizeList(false)
        setIsSelectSize(true)
        setSelectSize({ "sizeId": selectedSize.sizeId, "sizeDesc": selectedSize.sizeDescEn })
    }

    const onSelectColor = (selectedColor) => {

        setIsSelectColor(true)
        setSelectColor({ "colorId": selectedColor.colorId, "colorDesc": selectedColor.colorDescEn, "colorCode": selectedColor.colorCode })

        let productNewColor = props.prodDetail.sepcificDetail.find(obj => obj.colorId === selectedColor.colorId)
        setImgPhat(productNewColor.imgPath)
    }

    const finalProduct = () => {

        let productByColor = props.prodDetail.sepcificDetail.filter(obj => obj.colorId === selectColor.colorId)
        let product = productByColor.find(oj => oj.sizeId === selectSize.sizeId)

        setFinalSelectProduct(product)
    }

    const onQuantityChange = (event) => {

        if (event.target.value == "" || event.target.value == null || event.target.value == undefined) {
            setTotalPrice(0)
            return;
        }

        let qty = parseInt(event.target.value);


        if (qty <= 0) {
            setModalData({ "title": "Numeric error", "message": "Amount of item must more than zero.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            setQuantity(0)

            return;
        }

        if (finalSelectProduct.quantity < qty) {

            setModalData({ "title": "Numeric error", "message": "No enough supply stock, please contact our call center 02-000-0000.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            setQuantity(0)

            return;
        }

        setQuantity(qty)

        let price = finalSelectProduct.price * qty
        setTotalPrice(price)
    }

    const onClickAdd = () => {
        if(isSelectColor && isSelectSize){
            let temp = quantity;

            let result = validateQty(temp+1)
            if(!result) return;

            setQuantity(temp+1)
            
            let price = finalSelectProduct.price * (temp+1)
            setTotalPrice(price)
        }
    }

    const onClickRemove = () => {
        if(isSelectColor && isSelectSize){
            let temp = quantity;

            let result = validateQty(temp-1)
            if(!result) return;

            setQuantity(temp-1)

            let price = finalSelectProduct.price * (temp-1)
            setTotalPrice(price)
        }
    }

    const validateQty = (qty) => {

        if (qty == "" || qty == null || qty == undefined) {
            setTotalPrice(0)
            setQuantity(0)
            return false;
        }

        if (qty <= 0) {
            setModalData({ "title": "Numeric error", "message": "Amount of item must more than zero.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            setQuantity(0)

            return false;
        }

        if (finalSelectProduct.quantity < qty) {

            setModalData({ "title": "Numeric error", "message": "No enough supply stock, please contact our call center 02-000-0000.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            setQuantity(finalSelectProduct.quantity)

            return false;
        }

        return true;
    }

    const onClosingDialog = () => {

        // removel all value

        setSelectColor({ "colorId": 0, "colorDesc": "Please select." })
        setIsSelectColor(false)
        setSelectSize({ "sizeId": 0, "sizeDesc": "Please select." })
        setIsSelectSize(false)
        setShowDropdownSizeList(false)
        setQuantity(0)
        setTotalPrice(0)
        setFinalSelectProduct(null);

        props.closeProductModal();
    }

    const addToCartService = () => {

        try {

            // user Id validation
            let userId = localStorage.getItem("userId");
            if (userId == null) {
                setModalData({ "title": "Add product to cart error", "message": "Please sign-in.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }

            // Select color validation
            if (!isSelectColor) {
                setModalData({ "title": "Add product to cart error", "message": "Please select product color.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }

            // Select size validation
            if (!isSelectSize) {
                setModalData({ "title": "Add product to cart error", "message": "Please select product size.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }

            // Add quantity validation
            if (quantity <= 0) {
                setModalData({ "title": "Add product to cart error", "message": "Please add amount of product you want.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }

            // Total price
            if (totalPrice <= 0) {
                setModalData({ "title": "Add product to cart error", "message": "Calculated price error.", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }


            let path = service.BasePath + service.AddToCart;
            let body = "";

            body = JSON.stringify({
                "userId": userId,
                "productId": finalSelectProduct.productId,
                "productDetail": finalSelectProduct.productDetailId,
                "quantity": quantity,
                "price": totalPrice

            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            try {

                axios.post(path, body, config).then(((res) => {

                    if (!res.data.isError) {
                        getItemCartCount()
                        onClosingDialog();

                        return;
                    }

                    setModalData({ "title": "Error", "message": "System error.", "isShowImg": true, "showImageType": "error" })
                    setIsShowModal(true)

                })).catch((res) => {

                    if(res.response.status == 401){
                        props.handlerUnauthorized();
                    }

                });

            }
            catch {
                setModalData({ "title": "Error", "message": "System error.", "isShowImg": true, "showImageType": "error" })
                setIsShowModal(true)
            }
        }
        catch {

        }
    }


    const getItemCartCount = () => {

        let userId = localStorage.getItem("userId");
        if (userId != null) {
            let path = service.BasePath + service.GetCartCount;
            let body = "";

            body = JSON.stringify({
                "userId": userId,
            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            axios.post(path, body, config).then(((res) => {
                if (!res.data.isError) {
                    props.setCartItem(res.data.item)
                }
            })).catch((res) => {

                if(res.response.status == 401){
                    props.handlerUnauthorized();
                }
    
            });
        }
    }

    return (
        <div className='product-detail-modal-container'>
            <div className="overlay"></div>
            <div className="product-modal-content">
                <div className='product-modal-header-container'>
                    <p id='product-modal-header'>Add to Cart</p>
                </div>
                <div className='prodeuct-detail-container'>

                    {/* left side container */}

                    <div className='prodeuct-detail-container-left'>
                        <img id='product-detail-img' src={require('../Assets/Product/' + imgPaht + '.png')} />
                        <p id='product-desc-detail'>{props.prodDefultDetail.productDescEn}</p>
                        <ul className="prodeuct-detail-container-star">
                            {
                                [...Array(Math.floor(props.prodDefultDetail.reviewCount == 0 ? 5 : props.prodDefultDetail.rating))].map((_, index) => (
                                    props.prodDefultDetail.reviewCount == 0 ?
                                        <li key={index}><Star className="fa fa-star checked" size="24"></Star></li>
                                        :
                                        <li key={index}><StarFilled className="fa fa-star checked" size="24"></StarFilled></li>
                                ))
                            }
                            {
                                props.prodDefultDetail.rating % 1 > 0.5 ? <li><StarHalf className="single-star checked" size="24"></StarHalf></li> : null
                            }

                        </ul>
                        <p id='review-count'>{"(Reviewers :" + props.prodDefultDetail.reviewCount + ")"}</p>

                    </div>

                    {/* right side container */}
                    <div className='prodeuct-detail-container-right'>
                        <p id='product-name'>{props.prodDefultDetail.productNameEn}</p>
                        <div className='color-detail-container'>

                            <div className='color-header-container'>
                                <p id='picker-title'>Select Colors : </p>
                                <p id='picker-title' style={{ color: selectColor.colorDesc != "White" && selectColor.colorCode }}>{" " + selectColor.colorDesc}</p>
                            </div>

                            <div className="prod-detail-color-container">
                                {
                                    props.prodDefultDetail.sepcificDetail.map((detail) => (

                                        <ul key={detail.productDetailId} className="detail-color">
                                            <div onMouseDown={() => onSelectColor(detail)} >
                                                <li className="prod-detail-color-item" id="item-id" style={{ backgroundColor: detail.colorCode }}></li>
                                            </div>
                                        </ul>
                                    ))
                                }
                            </div>

                            <p id='picker-title'>Select Sizes</p>

                            <div className='prod-detail-size-container'>
                                <div className='size-selection' onMouseOver={mouseOverSizeList} >
                                    <p >{selectSize.sizeDesc}</p>
                                </div>
                                <div className='size-selection-dropdown' onMouseOver={mouseOverSizeList} onMouseOut={mouseOutSizeList} style={{ display: showDropdownSizeList ? 'flex' : 'none' }}>
                                    {
                                        props.prodDetail != null &&
                                        props.prodDetail.detailBySize.map((data) => (
                                            <div id='size-selection-choise-contain' key={data.sizeId} onMouseDown={() => onSelectSize(data)}>
                                                <p id='size-selection-choise'>{data.sizeDescEn}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <p id='picker-title'>Quantity</p>

                            <div className='prod-detail-quantity-container'>
                                <div className='prod-detail-quantity-qty'>
                                    <div className='sub-container'>
                                        <p>Store Qty.</p>
                                        <p>{finalSelectProduct == null ? 0 : finalSelectProduct.quantity}</p>
                                    </div>
                                    <div className='sub-container'>
                                        <p>Order</p>
                                        {/* <input type='number' id='qty-input' onChange={onQuantityChange} disabled={!isSelectColor || !isSelectSize} ></input> */}
                                        <div className='prod-quatity-contaainer'>
                                            <button id='button-quantity' onClick={() => onClickRemove()} style={{borderRadius:'10px 0 0 10px'}}>-</button>
                                            <input type='number' id='input-quantity' onChange={onQuantityChange} disabled={true} value={quantity} ></input>
                                            <button id='button-quantity' onClick={() => onClickAdd()} style={{borderRadius:'0 10px 10px 0'}}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='prod-detail-total-price'>
                                <p id='total-price'>{totalPrice == NaN ? 0 : totalPrice + " " + "฿"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='product-modal-button-container'>
                    <button onMouseDown={addToCartService} id='prod-detail-modal'>OK</button>
                    <button onMouseDown={onClosingDialog} id='prod-detail-modal-cancel'>CANCEL</button>
                </div>
            </div>
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </div>
    )
}

export default ProductDetailModal;