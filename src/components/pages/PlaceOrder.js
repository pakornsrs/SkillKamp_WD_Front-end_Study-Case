import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PlaceOrder.css'
import axios from 'axios';
import service from '../../config/service_path.json'
import CartItemCard from '../CartItemCard';
import ModalBase from '../global/ModalBase';


const PlaceOrder = () => {

    const navigate = useNavigate();

    const [orderDetail, setOrderDetail] = useState(null)

    const [fullAmount, setFullAmount] = useState(0)
    const [discountPercent, setDiscountPercent] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)

    const [selectPaymentType, setSelectPaymentType] = useState(0)
    const [selectPaymentTypeText, setSelectPaymentTypeText] = useState("Select payment method.")

    const [creditCardArray, setCreditCardArray] = useState(null);
    const [selectCardId, setSelectCardId] = useState(0);
    const [selectCardIdText, setSelectCardIdText] = useState("Select your card");

    const [userAddress, setUserAddress] = useState(null)
    const [selectAddressId, setSelectAddressId] = useState(null);
    const [selectAddressText, setSelectAddressText] = useState("Select your address");
    const [otherAddress, setOtherAddress] = useState("");

    const [couponCode, setCouponCode] = useState("");
    const [isCouponCodeActive, setIsCouponCodeActive] = useState(false);

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

    useEffect(() => {
        loadPage();

    }, [])

    const loadPage =()=>{
        let userId = localStorage.getItem("userId")

        if (userId != null) {
            let path = service.BasePath + service.PlaceOrder;
            let path2 = service.BasePath + service.GetAddress;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "userId": userId
            })

            axios.post(path, body, config).then(((res) => {
                if (!res.data.isError) {
                    console.log("get here", res.data.item)
                    setOrderDetail(res.data.item);
                    setFullAmount(res.data.item.totalAmount)
                }
                else {
                    navigate('/home');
                }
            }));

            axios.post(path2, body, config).then(((res) => {
                if (!res.data.isError) {

                    const myArray = Object.keys(res.data.item).map(key => {
                        return { key: key, value: res.data.item[key] };
                    });
                    setUserAddress(myArray)
                }
                else {
                    navigate('/home');
                }
            }));
        }
    }

    useEffect(() => {

        let userId = localStorage.getItem("userId")

        if (selectPaymentType == 2 && userId != null) {
            let path = service.BasePath + service.GetPaymentCard;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "userId": userId
            })

            axios.post(path, body, config).then(((res) => {
                if (!res.data.isError) {

                    const myArray = Object.keys(res.data.item).map(key => {
                        return { key: key, value: res.data.item[key] };
                    });

                    setCreditCardArray(myArray)

                }
                else {

                    console.log(res)
                    // navigate('/home');
                }
            }));
        }
    }, [selectPaymentType])

    const disableScrollBar = () => {

        document.body.style.overflow = 'hidden';
    }

    const enableScrollBar = () => {
        document.body.style.overflow = 'auto';
    }

    const paymentType = (type) => {

        setSelectPaymentTypeText(type)

        if (type == "Cash On Delivery") {
            setSelectPaymentType(1)
        }
        else if (type == "Debit/Credit Card") {
            setSelectPaymentType(2)
        }
    }

    const selectCard = (data) => {
        setSelectCardId(data.id)
        setSelectCardIdText(data.cardNo)
    }

    const selectAddress = (data) => {

        if (data != "Other") {
            console.log(data)
            setSelectAddressId(data.id)
            setSelectAddressText(data.addressLine1 + ", " + data.province)
        }
        else {
            setSelectAddressId(0)
            setSelectAddressText(data)
        }
    }

    const handleCouponChange = (event) => {
        console.log(event.target.value)
        setCouponCode(event.target.value);

        setDiscountPercent(0)
        setDiscountAmount(0)
        setIsCouponCodeActive(false)
    }

    const applyCoupon = () => {

        let userId = localStorage.getItem("userId")

        if (userId != null) {
            let path = service.BasePath + service.ApplyCoupon;
            let body = ""

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            body = JSON.stringify({
                "userId": userId,
                "orderId": orderDetail.id,
                "couponCode": couponCode
            })

            if(couponCode == null || couponCode.trim().length == 0){
                setModalData({ "title": "Apply Coupon", "message": "Please enter coupon code", "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true);

                return;
            }

            axios.post(path, body, config).then(((res) => {
                if (!res.data.isError) {

                    console.log("here")

                    setDiscountPercent(res.data.item.percentDiscount)

                    let discount = fullAmount * (res.data.item.percentDiscount / 100)
                    setDiscountAmount(discount)
                    
                    if(discountPercent>0){
                        setIsCouponCodeActive(true)
                    }

                    setModalData({ "title": "Apply Coupon", "message": res.data.errorMessage, "isShowImg": true, "showImageType": "alert" })
                    setIsShowModal(true)

                    return;
                }
                else {

                    setModalData({ "title": "Apply Coupon Error", "message": res.data.errorMessage, "isShowImg": true, "showImageType": "alert" })
                    setIsShowModal(true)

                    return;
                }
            }));
        }
    }

    const otherAddressHandle = (event) =>{
        setOtherAddress(event.target.value)
    }

    const confirmOrder = () => {
        
        let path = service.BasePath + service.ConfirmOrder;
        let body = ""

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if(selectPaymentType == null || selectPaymentType == 0){
            setModalData({ "title": "Confirm order warning", "message": "Pleas select payment method", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true);

            return;
        }

        if(selectPaymentType == 2 && (selectCardId == null || selectCardId == 0)){
            setModalData({ "title": "Confirm order warning", "message": "Please select credit/debit card", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true);

            return;
        }

        if(selectAddressId == null ){
            setModalData({ "title": "Apply Coupon", "message": "Please select delivery address.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true);

            return;
        }
        console.log("Detail", otherAddress)

        if(selectAddressId == 0 && otherAddress.trim().length == 0){

            setModalData({ "title": "Apply Coupon", "message": "Please enter delivery address detail.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true);

            return;
        }

        body = JSON.stringify({
            "userId": localStorage.getItem("userId"),
            "orderId": orderDetail.id,
            "paymentType": selectPaymentType,
            "cardId": selectCardId,
            "addressId" : selectAddressId,
            "addressDetail" : otherAddress
          });

        axios.post(path, body, config).then(res => {
            if(!res.data.isError){
                // Reload page if success go home
                loadPage();
            }
            else{

            }
        });
    }

    return (
        <React.Fragment>
            <div className='main-place-order-page'>
                <div className='order-header-container'>
                    <p id='order-summary-header'>Order Summary</p>
                </div>
                <div className='main-detail-container'>
                    <div className='order-product-detail-container'>
                        <div className='list-order-item-container'>
                            <div className='order-item-header-container'>
                                <div className='order-header-no'>
                                    <p id='order-table-header'>NO.</p>
                                </div>
                                <div className='order-header-img'>
                                    <p id='order-table-header'>Image</p>
                                </div>
                                <div className='order-header-detail'>
                                    <p id='order-table-header'>Product Detail</p>
                                </div>
                                <div className='order-header-price'>
                                    <p id='order-table-header'>Total Price</p>
                                </div>
                                <div className='order-header-qty'>
                                    <p id='order-table-header'>Quantity</p>
                                </div>
                            </div>
                        </div>
                        <div className='order-item-card-container' onMouseOver={disableScrollBar} onMouseLeave={enableScrollBar}>
                            <CartItemCard setCartItem={null} updateCartItem={null} mode={"summary"} />
                        </div>
                    </div>

                    <div className='payment-deliver-detail-container'>
                        <p id='payment-summary-title'>Payment and Deliver</p>
                        <div className='price-summary-container'>
                            <div className='price-summary-container-line'>
                                <p id='order-total-amount'>Total Amount:</p>
                                <p id='order-total-amount-full-amount'>{fullAmount} ฿</p>
                            </div>
                            <div className='price-summary-container-line' style={{ display: !isCouponCodeActive && 'none' }}>
                                <p id='order-total-amount'>Discount ({discountPercent}%) :</p>
                                <p id='order-total-amount-full-amount'>{"-" + discountAmount} ฿</p>
                            </div>
                            <div className='price-summary-container-line'>
                                <p id='order-total-amount'>Delivery Fee:</p>
                                <p id='order-total-amount-full-amount' >100 ฿</p>
                            </div>
                            <div className='price-summary-container-line'>
                                <p id='order-total-amount'>Total Amount:</p>
                                <p id='order-total-amount-full-amount' style={{color: isCouponCodeActive && 'green'}} >{fullAmount - discountAmount + 100} ฿</p>
                            </div>
                        </div>
                        <div className='input-coupon-container'>
                            <input id='coupon-input' type='text' placeholder='Enter discount code' onChange={handleCouponChange} />
                            <button id='coupon-input-button' onClick={applyCoupon}>Process</button>
                        </div>
                        <div className='payment-method-container'>
                            <p id='payment-method-header'>Payment Method</p>
                            <div className="order-dropdown">
                                <button className="order-dropbtn">{selectPaymentTypeText}</button>
                                <div className="order-dropdown-content">
                                    <p onClick={() => paymentType("Cash On Delivery")} id='drop-down-choise'>Cash on delivery</p>
                                    <p onClick={() => paymentType("Debit/Credit Card")} id='drop-down-choise'>Debit/Credit Card</p>

                                </div>
                            </div>
                            <div className="order-dropdown" style={{ display: selectPaymentType == 2 ? 'block' : 'none' }}>
                                <button className="order-dropbtn">{selectCardIdText}</button>
                                <div className="order-dropdown-content">
                                    {
                                        creditCardArray != null && creditCardArray.map((data) => (
                                            <p key={data.key} onClick={() => selectCard(data.value)} >{data.value.cardNo}</p>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='payment-method-container'>
                            <p id='payment-method-header'>Deliver Address</p>
                            <div className="order-dropdown">
                                <button className="order-dropbtn">{selectAddressText}</button>
                                <div className="order-dropdown-content">
                                    {
                                        userAddress != null && userAddress.map((data) => (
                                            <p key={data.key} onClick={() => selectAddress(data.value)} >
                                                {
                                                    data.value.addressLine1 + ", " + data.value.addressLine2 + " " + data.value.subdistrict + " " + data.value.district + " " + data.value.province + " " + data.value.zipCode
                                                }
                                            </p>
                                        ))
                                    }
                                    <p id='drop-down-choise' onClick={() => selectAddress("Other")}>Other</p>
                                </div>
                            </div>
                            <textarea type="text" id='other-address' style={{ display: selectAddressText == "Other" ? 'block' : 'none' }}  onChange={otherAddressHandle}/>
                        </div>

                        <div className='button-container'>
                            <button id='order-button-ok' onClick={() => confirmOrder()}>Confirm</button>
                            <div className='button-container-sub'>
                                <button id='order-button'>Cancel Order</button>
                                <button id='order-button'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </React.Fragment>
    )
}

export default PlaceOrder;