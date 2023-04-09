import React, { Component, useEffect, useState } from 'react';
import '../css/ProductDetailModal.css'
import { Star, StarFilled, StarHalf } from '@carbon/icons-react'
import axios from 'axios'
import service from '../config/service_path.json'
import ModalBase from './global/ModalBase';

const ProductDetailModal = (props) => {

    const [imgPaht, setImgPhat] = useState(props.prodDefultDetail.defaultImgPaht);
    const [selectColor, setSelectColor] = useState({ "colorId": 0, "colorDesc": "Please select." })
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
        setSelectColor({ "colorId": selectedColor.colorId, "colorDesc": selectedColor.colorDescEn })

        let productNewColor = props.prodDetail.sepcificDetail.find(obj => obj.colorId === selectedColor.colorId)
        setImgPhat(productNewColor.imgPath)
    }

    const finalProduct = () => {

        let productByColor = props.prodDetail.sepcificDetail.filter(obj => obj.colorId === selectColor.colorId)
        let product = productByColor.find(oj => oj.sizeId === selectSize.sizeId)

        setFinalSelectProduct(product)
    }

    const onQuantityChange = (event) => {

        if(event.target.value == "" || event.target.value == null || event.target.value == undefined){
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

        if(finalSelectProduct.quantity < qty){

            setModalData({ "title": "Numeric error", "message": "No enough supply stock, please contact our call center 02-000-0000.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            setQuantity(0)

            return;
        }

        setQuantity(qty)

        let price = finalSelectProduct.price * qty
        setTotalPrice(price)
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

            let path = service.BasePath + service.AddToCart;
            let body = "";

            body = JSON.stringify({
                "userId": userId,
                "productId": finalSelectProduct.productId,
                "productDetail": finalSelectProduct.productDetailId,
                "quantity": quantity

            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {

                axios.post(path, body, config).then(((res) => {

                    console.log("res log", res.data.item)

                    setModalData({ "title": "Add item to cart", "message": "Success.", "isShowImg": true, "showImageType": "correct" })
                    setIsShowModal(true)

                }));
            }
            catch {
                setModalData({ "title": "Error", "message": "System error.", "isShowImg": true, "showImageType": "error" })
                setIsShowModal(true)
            }
        }
        catch {

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
                                // [...Array(Math.floor(data.value.reviewCount == 0 ? 5 : data.value.rating))].map((_, index) => (
                                //     data.value.reviewCount == 0 ?
                                //         <li key={index}><Star className="fa fa-star checked" size="24"></Star></li>
                                //         :
                                //         <li key={index}><StarFilled className="fa fa-star checked" size="24"></StarFilled></li>
                                // ))
                                [...Array(Math.floor(props.prodDefultDetail.rating))].map((_, index) => (

                                    <li key={index}><StarFilled className="single-star checked" size="24"></StarFilled></li>
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

                            <p id='picker-title'>Select Colors</p>

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
                                            <div key={data.sizeId} onMouseDown={() => onSelectSize(data)}>
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
                                        <input type='number' id='qty-input' onChange={onQuantityChange} disabled={!isSelectColor || !isSelectSize} ></input>
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
                    <button onMouseDown={addToCartService}>OK</button>
                    <button onMouseDown={onClosingDialog}>CANCEL</button>
                </div>
            </div>
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </div>
    )
}

export default ProductDetailModal;