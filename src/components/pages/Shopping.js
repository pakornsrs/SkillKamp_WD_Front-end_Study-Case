import React, { Component, useEffect, useState } from 'react';
import '../../css/Shopping.css'
import axios from 'axios';
import service from '../../config/service_path.json'
import ProdCardMini from '../ProdCardMini';
import SlideShow from '../SlideShow';
import ProductDetailModal from '../ProductDetailModal';

const Shopping = (props) => {

    const [searchKey, setSearchKey] = useState("");
    const [productArray, setProductArray] = useState(null);

    const [showProduct, setShowProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productFullDetail, setProductFullDetail] = useState(null);

    useEffect(() => {
        
        if (selectedProduct != null) {

            let path = service.BasePath + service.ProductDetail;
            let body = "";

            body = JSON.stringify({
                productId: selectedProduct.productId

            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {

                axios.post(path, body, config).then(((res) => {

                    console.log("res", res.data.item)
                    setProductFullDetail(res.data.item);
                    
                }));
            }
            catch{

            }

            document.body.style.overflow = 'hidden';
            setShowProduct(true)
        }
    
    }, [selectedProduct]);



    const closeProductModal = () => {
        setShowProduct(false);
        setSelectedProduct(null)
        document.body.style.overflow = 'auto';
    }

    const updateSearchKey =(event)=>{
        setSearchKey(event.target.value);
    }

    return (
        <React.Fragment>
            <SlideShow/>
            <div className='shopping-page-main-container'>
            <h1>Shopping Collection</h1>
            <div className='search-bar-container'>
                <input type='text' placeholder='Search Keyword' id='search-keyword-input' onChange={updateSearchKey}></input>
                <button id='search-keyword-button'></button>
            
            </div>
            <div className='product-list-container'>
                <div className="filter-container">

                    <div className="dropdown">
                        <p id='filter-title'>Category of Product</p>
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>

                    <div className="dropdown">
                        <p id='filter-title'>Color of Product</p>
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>

                    <div className="dropdown">
                        <p id='filter-title'>Size of Product</p>
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>

                </div>

                <div className='product-card-container'>
                    <ProdCardMini setSelectedProduct = {setSelectedProduct} keyword ={searchKey} />
                </div>

            </div>
        </div>
        {showProduct && <ProductDetailModal closeProductModal={closeProductModal} prodDetail={productFullDetail} prodDefultDetail = {selectedProduct} setCartItem = {props.setCartItem}/>}
        </React.Fragment>
    )
}

export default Shopping