import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../config/service_path.json'
import axios from 'axios';
import LoadingScreen from './global/LoadingScreen';
import ModalBase from './global/ModalBase';
import '../css/SignUp.css'
import ButtonPannal from './global/ButtonPannal';
import UserAddressInfo from './UserAddressInfo';
import UserCardInfo from './pages/UserCardInfo';
import OneButton from './global/OneButton';
import { Phone, TrashCan } from '@carbon/icons-react'

const SignUp = (props) => {

    const navigate = useNavigate();

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showUserAddress, setShowUserAddress] = useState(false);
    const [showUserCard, setShowUserCard] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [nameTh, setNameTh] = useState("")
    const [lastnameTh, setLastnameTh] = useState("")
    const [nameEn, setNameEn] = useState("")
    const [lastnameEn, setLastnameEn] = useState("")
    const [gender, setGender] = useState(0)
    const [isCheckMale, setIsCheckMale] = useState(false)
    const [isCheckFemale, setIsCheckFeale] = useState(false)
    const [isCheckOther, setIsCheckOther] = useState(false)
    const [birthDate, setBirthDate] = useState("")
    const [birthDateUnix, setBirthDateUnix] = useState(0)
    const [email, setEmail] = useState("")
    const [telNo, setTelNo] = useState("")


    const [userAddressList, setUserAddressList] = useState([])
    const [userAddress1, setUserAddress1] = useState("")
    const [userAddress2, setUserAddress2] = useState("")
    const [userSubDistrict, setUserSubDistrict] = useState("")
    const [userDistrict, setUserDistrict] = useState("")
    const [userProvince, setUserProvince] = useState("")
    const [userZipCode, setUserZipCode] = useState("")

    const [userCardList, setUserCardList] = useState([])
    const [userCardNumber, setUserCardNumber] = useState("")
    const [nameOnCard, setNameOnCard] = useState("")
    const [cardExpireDate, setCardExpireDate] = useState("")
    const [cardExpireDateUnix, setCardExpireDateUnix] = useState(0)
    const [cvv, setCVV] = useState("")

    const displaySection1 = () => {
        setShowUserInfo(true)
        setShowUserAddress(false)
        setShowUserCard(false)
    }

    const displaySection2 = () => {

        // Validate for 1st section info

        let curret = new Date();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const thaiPhoneNumberRegex = /^(\+66|0)[0-9]{9}$/;

        if (username.trim().length <= 6) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter usernam with minimum 6 letters.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (password.trim().length <= 6) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter password with minimum 8 letters.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (nameTh.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your name in Thai.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (lastnameTh.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your lastname in Thai.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (nameEn.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter you rname in Englist.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (lastnameEn.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your lastname in Englist.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (gender == null || gender == 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please give infomation about your gender.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (birthDateUnix == 0 || birthDateUnix >= curret.getTime()) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your birthdate and your birthdate must be past.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (telNo.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your phone No.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (!thaiPhoneNumberRegex.test(telNo)) {
            setModalData({ "title": "Sign-On warning", "message": "Phone No. format pattern was wrong.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (email.trim().length <= 0) {
            setModalData({ "title": "Sign-On warning", "message": "Please enter your email address.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (!emailRegex.test(email)) {
            setModalData({ "title": "Sign-On warning", "message": "Email address format pattern was wrong.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }

        setShowUserInfo(false)
        setShowUserAddress(true)
        setShowUserCard(false)
    }

    const displaySection3 = () => {

        if (userAddressList.length < 1) {
            setModalData({ "title": "Sign-On warning", "message": "Please add at least 1 address for delivery detail.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)

            return;
        }

        setShowUserInfo(false)
        setShowUserAddress(false)
        setShowUserCard(true)

        setModalData({ "title": "Sign-On infomation", "message": "You can submit without add credit/debit card.", "isShowImg": true, "showImageType": "info" })
        setIsShowModal(true)
    }

    const checkMale = () => {
        setIsCheckMale(true)
        setIsCheckFeale(false)
        setIsCheckOther(false)

        setGender(1);
    }

    const checkFemale = () => {
        setIsCheckMale(false)
        setIsCheckFeale(true)
        setIsCheckOther(false)

        setGender(2);
    }

    const checkOther = () => {
        setIsCheckMale(false)
        setIsCheckFeale(false)
        setIsCheckOther(true)

        setGender(3);
    }

    const updateUsername = (event) => {
        setUsername(event.target.value)
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const updateNameTh = (event) => {
        setNameTh(event.target.value)
    }

    const updateLastnameTh = (event) => {
        setLastnameTh(event.target.value)
    }

    const updateNameEn = (event) => {
        setNameEn(event.target.value)
    }

    const updateLastnameEn = (event) => {
        setLastnameEn(event.target.value)
    }

    const updateBirthDate = (event) => {
        setBirthDate(event.target.value)

        let newDate = new Date(event.target.value)
        setBirthDateUnix(newDate.getTime())
    }

    const updateEmail = (event) => {
        setEmail(event.target.value)
    }

    const updateTelNo = (event) => {
        setTelNo(event.target.value)
    }


    const addAddress = () => {

        if (userAddress1.trim().length <= 0) {
            console.log(userAddress1.trim().length)
            setModalData({ "title": "Add address warning", "message": "Please enter address at least 1 line.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (userSubDistrict.trim().length <= 0) {
            setModalData({ "title": "Add address warning", "message": "Please enter sub-district you live.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (userDistrict.trim().length <= 0) {
            setModalData({ "title": "Add address warning", "message": "Please enter district you live.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (userProvince.trim().length <= 0) {
            setModalData({ "title": "Add address warning", "message": "Please enter province you live.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (userZipCode.trim().length <= 0) {
            setModalData({ "title": "Add address warning", "message": "Please enter zip code.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else {
            let temp = userAddressList;

            let userAddress = {
                "addressLine1": userAddress1,
                "addressLine2": userAddress2,
                "province": userSubDistrict,
                "district": userDistrict,
                "subdistrict": userProvince,
                "zipCode": userZipCode
            }

            temp.push(userAddress)

            setUserAddressList(temp);

            // clear value
            setUserAddress1("")
            setUserAddress2("")
            setUserSubDistrict("")
            setUserDistrict("")
            setUserProvince("")
            setUserZipCode("")

        }

    }

    const addCard = () => {

        let current = new Date();

        if (userCardNumber.trim().length !== 16) {
            console.log(userAddress1.trim().length)
            setModalData({ "title": "Add Card Warning", "message": "Card number must contain 16 digits", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (nameOnCard.trim().length <= 0) {
            setModalData({ "title": "Add address warning", "message": "Please enter card owner name.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (cardExpireDateUnix < current.getTime()) {
            setModalData({ "title": "Add address warning", "message": "Please enter expire date or card expire date must be future date.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else if (cvv.trim().length != 3) {
            setModalData({ "title": "Add address warning", "message": "Please enter or check card CVV number.", "isShowImg": true, "showImageType": "alert" })
            setIsShowModal(true)
            return;
        }
        else {
            let temp = userCardList;

            let userCard = {
                "cardNo": userCardNumber,
                "nameOnCard": nameOnCard,
                "CardExpireDateUnix": cardExpireDateUnix,
                "cvv": cvv,
                "cardProvider": 0
            }

            temp.push(userCard)

            setUserCardList(temp);

            // clear value
            setUserCardNumber("")
            setNameOnCard("")
            setCardExpireDate("")
            setCVV("")

            console.log(userCardList)
        }
    }

    const removeAddress = (data) => {

        let temp = [];
        for (let i = 0; i < userAddressList.length; i++) {
            if (userAddressList[i] != data) {
                temp.push(userAddressList[i])
            }
        }

        setUserAddressList(temp)
    }

    const removeCard = (data) => {

        let temp = [];
        for (let i = 0; i < userCardList.length; i++) {
            if (userCardList[i] != data) {
                temp.push(userCardList[i])
            }
        }

        setUserCardList(temp)
    }

    const submitData = () => {

        let path = service.BasePath + service.SingUp;
        let body = "";

        body = JSON.stringify({
            "user": {
                "username": username,
                "password": password,
                "firstNameTh": nameTh,
                "lastNameTh": lastnameTh,
                "firstNameEn": nameTh,
                "lastNameEn": lastnameEn,
                "birthDate": birthDateUnix,
                "gender": gender,
                "telNo": "099999999",
                "email": "test.test@gmail,com"
            },
            "userAddress": userAddressList,
            "userCard": userCardList
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(path, body, config).then((res) => {

            if (!res.data.isError) {

                setModalData({ "title": "Signin Error", "message": res.data.errorMessage, "isShowImg": true, "showImageType": "correct" })
                setIsShowModal(true)

                navigate('/sign-in');
            }

            setModalData({ "title": "Signin Error", "message": res.data.errorMessage, "isShowImg": true, "showImageType": "error" })
                setIsShowModal(true)
        });
    }

    return (
        <div className='page-container'>
            <div className='register-form-container'>
                <div className='title-signup'>
                    <p>Sign-Up</p>
                </div>

                <div className='input-area-container' style={{ display: !showUserInfo && 'none' }}>
                    <div className='input-container'>
                        <p id='input-label'>Username : </p>
                        <input className='signin-input' type='text' onChange={updateUsername} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Password : </p>
                        <input className='signin-input' type='password' onChange={updatePassword} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Name (TH) : </p>
                        <input className='signin-input' type='text' onChange={updateNameTh} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Lastname (TH) : </p>
                        <input className='signin-input' type='text' onChange={updateLastnameTh} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Name (EN) : </p>
                        <input className='signin-input' type='text' onChange={updateNameEn} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Lastname (EN) : </p>
                        <input className='signin-input' type='text' onChange={updateLastnameEn} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Gender : </p>
                        <div className='checkbox-input-container'>
                            <div className='selection-container'>
                                <input type='checkbox' checked = {isCheckMale} onChange={checkMale}/>
                                <p>Male</p>
                            </div>
                            <div className='selection-container'>
                                <input type='checkbox' checked = {isCheckFemale} onChange={checkFemale}/>
                                <p>Female</p>
                            </div>
                            <div className='selection-container'>
                                <input type='checkbox' checked = {isCheckOther} onChange={checkOther}/>
                                <p>Others</p>
                            </div>
                        </div>
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Birth date : </p>
                        <input className='signin-input' type='date' onChange={updateBirthDate} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>Telephone No. : </p>
                        <input className='signin-input' type='text' maxLength={10} onChange={updateTelNo} />
                    </div>
                    <div className='input-container'>
                        <p id='input-label'>E-mail : </p>
                        <input className='signin-input' type='text' onChange={updateEmail} />
                    </div>
                </div>


                <div className='input-area-container' style={{ display: !showUserAddress && 'none' }}>
                    <UserAddressInfo
                        userAddress1={userAddress1}
                        userAddress2={userAddress2}
                        userSubDistrict={userSubDistrict}
                        userDistrict={userDistrict}
                        userProvince={userProvince}
                        userZipCode={userZipCode}
                        setUserAddress1={setUserAddress1}
                        setUserAddress2={setUserAddress2}
                        setUserSubDistrict={setUserSubDistrict}
                        setUserDistrict={setUserDistrict}
                        setUserProvince={setUserProvince}
                        setUserZipCode={setUserZipCode} />
                    <div className='input-container' style={{ display: (userAddressList.length >= 1 ? 'block' : 'none') }}>
                        <p id='input-label'>Address Lsist : </p>
                        {
                            userAddressList.length >= 1 && userAddressList.map((data) => (
                                <div key={Math.floor(Math.random() * 1001)} className='added-data-container'>
                                    <div className='added-data-detail'>
                                        <p>{data.addressLine1 + " " + data.addressLine2}</p>
                                    </div>
                                    <div className='added-data-button'>
                                        <button className='added-del-button' onClick={() => removeAddress(data)}>
                                            <TrashCan size="24" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <OneButton center={"Add"} centerFunc={addAddress} />
                </div>

                <div className='input-area-container' style={{ display: !showUserCard && 'none' }}>
                    <UserCardInfo
                        userCardNumber={userCardNumber}
                        nameOnCard={nameOnCard}
                        cardExpireDate={cardExpireDate}
                        setCardExpireDateUnix={setCardExpireDateUnix}
                        cvv={cvv}
                        setUserCardNumber={setUserCardNumber}
                        setNameOnCard={setNameOnCard}
                        setCardExpireDate={setCardExpireDate}
                        setCVV={setCVV}
                    />

                    <div className='input-container' style={{ display: (userCardList.length >= 1 ? 'block' : 'none') }}>
                        <p id='input-label'>Card Lsist : </p>
                        {
                            userCardList.length >= 1 && userCardList.map((data) => (
                                <div key={Math.floor(Math.random() * 1001)} className='added-data-container'>
                                    <div className='added-data-detail'>
                                        <p>{data.nameOnCard + " - " + data.cardNo}</p>
                                    </div>
                                    <div className='added-data-button'>
                                        <button className='added-del-button' onClick={() => removeCard(data)}>
                                            <TrashCan size="24" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <OneButton center={"Add"} centerFunc={addCard} />
                </div>

                <div className='button-pannel-container' style={{ display: !showUserInfo && 'none' }}>
                    <ButtonPannal left={"Next"} right={"Cancel"} leftFunc={displaySection2} rightFunc={() => navigate(-1)} />
                </div>
                <div className='button-pannel-container' style={{ display: !showUserAddress && 'none' }}>
                    <ButtonPannal left={"Next"} right={"Back"} leftFunc={displaySection3} rightFunc={displaySection1} />
                </div>
                <div className='button-pannel-container' style={{ display: !showUserCard && 'none' }}>
                    <ButtonPannal left={"Submit"} right={"Back"} leftFunc={submitData} rightFunc={displaySection2} />
                </div>
            </div>
            {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
        </div>
    )
}

export default SignUp;