import React, { component, useEffect, useState } from 'react'
import SlideShow from '../SlideShow.js'
import '../../css/Home.css'
import NewArrivalProds from '../NewArrivalProds.js'
import axios from 'axios'
import service from '../../config/service_path.json'
import ModalBase from '../global/ModalBase.js'
import LoadingScreen from '../global/LoadingScreen.js'
import ProductDetailModal from '../ProductDetailModal.js'

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productFullDetail, setProductFullDetail] = useState(null);
    const [showProduct, setShowProduct] = useState(false);

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

    return (
        <React.Fragment>
            {
                isLoading ? <LoadingScreen />
                    :
                    <React.Fragment>
                        <React.Fragment>
                            <SlideShow />
                            <NewArrivalProds selectedProduct={setSelectedProduct} />
                        </React.Fragment>
                        {showProduct && <ProductDetailModal closeProductModal={closeProductModal} prodDetail={productFullDetail} prodDefultDetail = {selectedProduct} />}
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Home;