import React, { useState, useEffect } from 'react';
import '../css/ProdCardMini.css';
import testImg from '../Assets/Product/Product1_3.png'
import axios from 'axios'
import service from '../config/service_path.json'
import { Star, StarFilled, StarHalf } from '@carbon/icons-react'

const ProdCardMini = (props) => {

    const [newArrivalProd, setNewArrivalProd] = useState([]);

    // props.setSelectedProduct

    useEffect(() => {

        let path = service.BasePath + service.SearchProduct;
        let body = "";

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        body = JSON.stringify({
            keywork: props.keyword

        })

        axios.post(path,body, config).then(res => {
            setNewArrivalProd(res.data.item)
        });

    }, [props.keyword]);

    const products = newArrivalProd;
    const myArray = Object.keys(products).map(key => {
        return { key: key, value: products[key] };
    });

    const addToCart = (product) => {
        props.setSelectedProduct(product)
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
                        <h6>{data.value.priceStart + "฿"}</h6>
                        <ul className="star">
                            {
                                [...Array(Math.floor(data.value.reviewCount == 0 ? 5 : data.value.rating))].map((_, index) => (
                                    data.value.reviewCount == 0 ?
                                        <li key={index}><Star className="fa fa-star checked" size="24"></Star></li>
                                        :
                                        <li key={index}><StarFilled className="fa fa-star checked" size="24"></StarFilled></li>
                                ))
                                // [...Array(Math.floor(data.value.rating))].map((_, index) => (

                                //     <li key={index}><StarFilled className="fa fa-star checked" size="24"></StarFilled></li>
                                // ))
                            }
                            {/* {
                                data.value.rating % 1 > 0.5 ? <li><StarHalf className="fa fa-star checked" size="24"></StarHalf></li> : null
                            } */}

                        </ul>
                        <p id='review-count'>{"(Reviewers :" + data.value.reviewCount + ")"}</p>
                        <div className="buy-button-container">
                            <button className="buy-now">Buy Now</button>
                            <button className="buy-add-cart" onClick={() => addToCart(data.value)}>Add</button>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export default ProdCardMini;
