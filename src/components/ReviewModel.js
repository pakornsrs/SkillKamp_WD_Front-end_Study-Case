import React, { useState } from 'react';
import '../css/ReviewModel.css'
import { Star, StarFilled} from '@carbon/icons-react'
import axios from 'axios'
import service from '../config/service_path.json'
import ButtonPannal from './global/ButtonPannal';
import ModalBase from './global/ModalBase';

const ReviewModel = (props) => {

    // selectProductReviewIrem
    const user = localStorage.getItem("username");

    const [starFull1, setStarFull1] = useState(false)
    const [starFull2, setStarFull2] = useState(false)
    const [starFull3, setStarFull3] = useState(false)
    const [starFull4, setStarFull4] = useState(false)
    const [starFull5, setStarFull5] = useState(false)

    const [rate, setRate] = useState(0)

    const [recYes, setRecYes] = useState(false)
    const [recNo, setRecNo] = useState(false)
    const [isRecommend, setIsRecommend] = useState(false)

    const [reviewText, setReviewText] = useState("")

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

    const ratingAdd = (rating) =>{

        if(rate == rating) return;

        setRate(rating)

        if(rating == 1){
            setStarFull1(true)
            setStarFull2(false)
            setStarFull3(false)
            setStarFull4(false)
            setStarFull5(false)
        }
        else if(rating == 2){
            setStarFull1(true)
            setStarFull2(true)
            setStarFull3(false)
            setStarFull4(false)
            setStarFull5(false)
        }
        else if(rating == 3){
            setStarFull1(true)
            setStarFull2(true)
            setStarFull3(true)
            setStarFull4(false)
            setStarFull5(false)
        }
        else if(rating == 4){
            setStarFull1(true)
            setStarFull2(true)
            setStarFull3(true)
            setStarFull4(true)
            setStarFull5(false)
        }
        else if(rating == 5){
            setStarFull1(true)
            setStarFull2(true)
            setStarFull3(true)
            setStarFull4(true)
            setStarFull5(true)
        }
    }

    // const checkRecommend = (result) =>{
    //     if(result == "yes"){
    //         setRecYes(true)
    //         setRecNo(false)

    //         setIsRecommend(true)
    //     }
    //     else if(result == "no"){
    //         setRecYes(false)
    //         setRecNo(true)

    //         setIsRecommend(false)
    //     }
    // }

    const checkRecommendYes = () => {
        setRecYes(true)
        setRecNo(false)
        setIsRecommend(true)
    }

    const checkRecommendNo = () => {

        setRecYes(false)
        setRecNo(true)
        setIsRecommend(false)
    }

    const handleTextChange = (event) => {
        setReviewText(event.target.value)
    }

    const submitReview = () => {
        let path = service.BasePath + service.CreateReview;
            let body = ""
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("webToken")
                }
            }

            body = JSON.stringify({
                "userId": localStorage.getItem("userId"),
                "prodId": props.selectProductReviewIrem.productId,
                "prodDetailId": props.selectProductReviewIrem.productDetailId,
                "orderId": props.selectProductReviewIrem.orderId,
                "rating": rate,
                "reviewerName": localStorage.getItem("username"),
                "text": reviewText,
                "isRecommend": isRecommend
              })

              console.log(body)

            axios.post(path, body, config).then(res => {
                if (!res.data.isError) {
                    props.loadCartITemHistory();
                    props.setShowReviewModal(false);
                }
                else{
                    setModalData({ "title": "Service Error", "message": res.data.errorMessage, "isShowImg": true, "showImageType": "error" })
                    setIsShowModal(true)
                }
            }).catch((res) => {

                if(res.response.status == 401){
                    props.handlerUnauthorized();
                }
    
            });
    }

    return (
        <div className='review-main-container'>
            <div className='review-content-container'>
                <div className='cart-modal-header-container'>
                    <p id='cart-modal-header'>Review Product</p>
                </div>
                <div className='review-main-section'>
                    <div className='review-main-section-left'>
                        <div className='review-image-contaainer'>
                            <img src={require('../Assets/Product/' + props.selectProductReviewIrem.imagePath + '.png')} />
                        </div>
                        <p id='review-product-name'>{props.selectProductReviewIrem.productNameEn}</p>
                    </div>
                    <div className='review-main-section-right'>
                        <div className='reviewer-topic-container'>
                            <p>Reviewer Name :&nbsp;&nbsp;</p>
                            <p>{user}</p>
                        </div>
                        <div className='reviewer-topic-container'>
                            <p>Rating : &nbsp;&nbsp;</p>
                            <div className='star-review-container'>
                                <div className='star-review' onClick={() => ratingAdd(1)}>
                                    <Star size="32"/>
                                    <StarFilled id='star-full-review' size="32" style={{display: starFull1 && 'inline'}}/>
                                </div>
                                <div className='star-review' onClick={() => ratingAdd(2)}>
                                    <Star size="32"/>
                                    <StarFilled id='star-full-review' size="32" style={{display: starFull2 && 'inline'}}/>
                                </div>
                                <div className='star-review' onClick={() => ratingAdd(3)}>
                                    <Star size="32"/>
                                    <StarFilled id='star-full-review' size="32" style={{display: starFull3 && 'inline'}}/>
                                </div>
                                <div className='star-review' onClick={() => ratingAdd(4)}>
                                    <Star size="32"/>
                                    <StarFilled id='star-full-review' size="32" style={{display: starFull4 && 'inline'}}/>
                                </div>
                                <div className='star-review' onClick={() => ratingAdd(5)}>
                                    <Star size="32"/>
                                    <StarFilled id='star-full-review' size="32" style={{display: starFull5 && 'inline'}}/>
                                </div>
                    
                            </div>
                        </div>
                        <div className='reviewer-topic-text-container'>
                            <p>Review Content :&nbsp;&nbsp;</p>
                            <textarea onChange={handleTextChange}/>
                        </div>
                        <div className='reviewer-topic-container'>
                            <p>Recommendation :&nbsp;&nbsp;</p>
                            <input type='checkbox' checked={recYes} style={{marginLeft:'10px'}} onChange={() => checkRecommendYes()}/>
                            <p>&nbsp;&nbsp;Yes</p>
                            <input type='checkbox' checked={recNo} style={{marginLeft:'10px'}} onChange={() => checkRecommendNo()}/>
                            <p>&nbsp;&nbsp;No</p>
                        </div>
                    </div>
                </div>
                <div className='button-pannel-container'>
                    <ButtonPannal left={"OK"} right={"CANCEL"} leftFunc = {() => submitReview()} rightFunc={() => props.setShowReviewModal(false)} />
                </div>
            </div>
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </div>
    )
}

export default ReviewModel;