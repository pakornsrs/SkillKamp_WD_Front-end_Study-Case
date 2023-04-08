import React, { component, useEffect, useState } from 'react'
import SlideShow from '../SlideShow.js'
import '../../css/Home.css'
import NewArrivalProds from '../NewArrivalProds.js'
import axios from 'axios'
import service from '../../config/service_path.json'
import ModalBase from '../global/ModalBase.js'
import LoadingScreen from '../global/LoadingScreen.js'

const Home = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });
    // const [newArrivalProd, setNewArrivalProd] = useState([]);

    // useEffect(() => {
    //     let path = service.BasePath + service.NewArrival;

    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }

    //     axios.get(path, config).then(res =>{
    //         setNewArrivalProd(res.data)
    //     });
    // }, []);

    return (
        <React.Fragment>
            {
                isLoading ? <LoadingScreen />
                    :
                    <React.Fragment>
                        <SlideShow />
                        <NewArrivalProds/>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Home;