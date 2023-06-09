import React, { useState, useEffect } from 'react';
import '../css/ProdCard.css';
import axios from 'axios'
import service from '../config/service_path.json'
import { Star, StarFilled, StarHalf } from '@carbon/icons-react'

const ProdCard = (props) => {

    const [newArrivalProd, setNewArrivalProd] = useState([]);

    useEffect(() => {
        let path = service.BasePath + service.NewArrival;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("webToken")
            }
        }
        axios.get(path, config).then(res => {
            setNewArrivalProd(res.data.item)
        }).catch((res) => {

            if(res.response.status == 401){
                props.handlerUnauthorized();
            }

        });
    }, []);

    const products = newArrivalProd;
    const myArray = Object.keys(products).map(key => {
        return { key: key, value: products[key] };
    });

    const addToCart =(product) =>{
        props.selectedProduct(product)
    }


    return (
        <React.Fragment>
            {
                myArray.map((data) => (
                    <div className="content" key={data.value.productId}>
                        <img src={require('../Assets/Product/' + data.value.defaultImgPaht + '.png')} />
                        <div className="color-container">
                            {
                                data.value.sepcificDetail.map((detail) => (

                                    <ul key={detail.productDetailId} className="color">
                                        <li className="color-item" id="black" style={{ backgroundColor: detail.colorCode, borderColor: detail.colorId === 1 ? "#DADADA" : detail.colorCode }}></li>
                                    </ul>
                                ))
                            }
                        </div>
                        <h3>{data.value.productNameEn}</h3>
                        <p id='product-desc'>{data.value.productDescEn}</p>
                        <h6>{data.value.priceStart + "฿"}</h6>
                        <ul className="star">
                            {
                                [...Array(Math.floor(data.value.reviewCount == 0 ? 5 : data.value.rating))].map((_, index) => (
                                    data.value.reviewCount == 0 ?
                                        <li key={index}><Star className="fa fa-star checked" size="24"></Star></li>
                                        :
                                        <li key={index}><StarFilled className="fa fa-star checked" size="24"></StarFilled></li>
                                ))
                            }
                            {
                                data.value.rating % 1 >= 0.5 ? <li><StarHalf className="fa fa-star checked" size="24"></StarHalf></li> : null
                            }

                        </ul>
                        <p id='review-count'>{"(Reviewers :" + data.value.reviewCount + ")"}</p>
                        <div className="buy-button-container">
                            <button className="buy-now" onClick={() => addToCart(data.value)}>Buy Now</button>
                            <button className="buy-add-cart" onClick={()=>addToCart(data.value)}>Add to Cart</button>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default ProdCard;
