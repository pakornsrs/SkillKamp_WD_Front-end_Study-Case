import React, { Component, useEffect, useState } from 'react';
import '../../css/Shopping.css'
import axios from 'axios';
import service from '../../config/service_path.json'
import ProdCardMini from '../ProdCardMini';
import SlideShow from '../SlideShow';
import ProductDetailModal from '../ProductDetailModal';

const Shopping = (props) => {

    const [searchKey, setSearchKey] = useState("");
    // const [productArray, setProductArray] = useState(null);

    const [showProduct, setShowProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productFullDetail, setProductFullDetail] = useState(null);

    const [productColor, setProductColor] = useState(null);
    const [productSize, setProductSize] = useState(null);
    const [productCategory, setProductCategory] = useState(null);

    const [categoryFilter,setCategoryFilter] = useState(null);
    const [colorFilter,setColorFilter] = useState(null);
    const [categoryFilterText,setCategoryFilterText] = useState("All Categories");
    const [colorFilterText,setColorFilterText] = useState("All Colors");

    useEffect(() => {

        let pathCategory = service.BasePath + service.GetAllCategory;
        let pathSize = service.BasePath + service.GetAllProductSize;
        let pathColor = service.BasePath + service.GetAllProductColor;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("webToken")
            }
        }

        axios.get(pathCategory, config).then(((res) => {
            if (!res.data.isError) {

                const myArray = Object.keys(res.data.item).map(key => {
                    return { key: key, value: res.data.item[key] };
                });
                setProductCategory(myArray);
            }
        })).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });

        axios.get(pathSize, config).then(((res) => {
            if (!res.data.isError) {
                const myArray = Object.keys(res.data.item).map(key => {
                    return { key: key, value: res.data.item[key] };
                });
                setProductSize(myArray);
            }
        })).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });

        axios.get(pathColor, config).then(((res) => {
            if (!res.data.isError) {
                const myArray = Object.keys(res.data.item).map(key => {
                    return { key: key, value: res.data.item[key] };
                });
                setProductColor(myArray);
            }
        })).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });
    }, [])

    useEffect(() => {

        if (selectedProduct != null) {

            let path = service.BasePath + service.ProductDetail;
            let body = "";

            body = JSON.stringify({
                productId: selectedProduct.productId

            })

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            axios.post(path, body, config).then(((res) => {

                setProductFullDetail(res.data.item);

            })).catch((res) => {

                if(res.response.status == 401){
                    props.handlerUnauthorized();
                }
    
            });

            document.body.style.overflow = 'hidden';
            setShowProduct(true)
        }

    }, [selectedProduct]);




    const closeProductModal = () => {
        setShowProduct(false);
        setSelectedProduct(null)
        document.body.style.overflow = 'auto';
    }

    const updateSearchKey = (event) => {
        setSearchKey(event.target.value);
    }

    return (
        <React.Fragment>
            <SlideShow />
            <div className='shopping-page-main-container'>
                <h1 id='page-header'>Shopping Collection</h1>
                <div className='search-bar-container'>
                    <input type='text' placeholder='Search Keyword' id='search-keyword-input' onChange={updateSearchKey}></input>
                    <button id='search-keyword-button'>Search</button>

                </div>
                <div className='product-list-container'>
                    <div className="filter-container">

                        <div className="dropdown">
                            <p id='filter-title'>Category of Product</p>
                            <button className="dropbtn">{categoryFilterText}</button>
                            <div className="dropdown-content">
                                <p onClick={() => (setCategoryFilter(null),setCategoryFilterText("All Categories"))}>All Categories</p>
                                {
                                    productCategory != null && productCategory.map((data) => (
                                        <p key={data.key} onClick={() => (setCategoryFilter(data.value.id), setCategoryFilterText(data.value.nameEn))}>{data.value.nameEn}</p>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="dropdown">
                            <p id='filter-title'>Color of Product</p>
                            <button className="dropbtn">{colorFilterText}</button>
                            <div className="dropdown-content">
                                <p onClick={() => (setColorFilter(null),setColorFilterText("All Colors"))}>All Colors</p>
                                {
                                    productColor != null && productColor.map((data) => (
                                        <p key={data.key} onClick={() => (setColorFilter(data.value.id), setColorFilterText(data.value.colorNameEn))}>{data.value.colorNameEn}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='product-card-container'>
                        <ProdCardMini setSelectedProduct={setSelectedProduct} keyword={searchKey} categoryFilter={categoryFilter} colorFilter={colorFilter} handlerUnauthorized = {props.handlerUnauthorized}/>
                    </div>

                </div>
            </div>
            {showProduct && <ProductDetailModal closeProductModal={closeProductModal} prodDetail={productFullDetail} prodDefultDetail={selectedProduct} setCartItem={props.setCartItem} handlerUnauthorized = {props.handlerUnauthorized}/>}
        </React.Fragment>
    )
}

export default Shopping