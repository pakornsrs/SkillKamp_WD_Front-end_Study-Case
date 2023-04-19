import React, { useEffect, useState } from 'react'
import SlideShow from '../SlideShow.js'
import '../../css/Home.css'
import NewArrivalProds from '../NewArrivalProds.js'
import axios from 'axios'
import service from '../../config/service_path.json'
import LoadingScreen from '../global/LoadingScreen.js'
import ProductDetailModal from '../ProductDetailModal.js'

const Home = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productFullDetail, setProductFullDetail] = useState(null);
    const [showProduct, setShowProduct] = useState(false);
    

    useEffect(() => {
        let userId = localStorage.getItem("userId")
        if (userId != null) {
            props.updateCartItem();
            props.updateCouponItem();
        }
    }, []);

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

    return (
        <React.Fragment>
            {
                isLoading ? <LoadingScreen />
                    :
                    <React.Fragment>
                        <React.Fragment>
                            <div>
                                <SlideShow />
                            </div>
                            <NewArrivalProds selectedProduct={setSelectedProduct}/>
                        </React.Fragment>
                        {showProduct && <ProductDetailModal closeProductModal={closeProductModal} prodDetail={productFullDetail} prodDefultDetail={selectedProduct} setCartItem={props.setCartItem} handlerUnauthorized = {props.handlerUnauthorized}/>}
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Home;