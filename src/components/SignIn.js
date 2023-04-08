import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../config/service_path.json'
import axios from 'axios';
import LoadingScreen from './global/LoadingScreen';
import ModalBase from './global/ModalBase';
import '../css/SingInOut.css';


const SignIn = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalData, setModalData] = useState({ "title": "modalTitle", "message": "modal message", "isShowImg": true, "showImageType": "none" });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const userSignIn = async () => {

        // Validate
        if ((username == null || username.trim().length === 0)) {
            setModalData({ "title": "Signin Validate Error", "message": "Please enter your username.", "isShowImg": true, "showImageType": "error" })
            setIsShowModal(true)

            console.log("val username")

            return;
        }

        if ((password == null || password.trim().length === 0)) {
            setModalData({ "title": "Signin Validate Error", "message": "Please enter your password.", "isShowImg": true, "showImageType": "error" })
            setIsShowModal(true)

            console.log("val password")

            return;
        }

        let path = service.BasePath + service.SignIn;
        let body = "";

        body = JSON.stringify({
            username: username,
            password: password
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            setIsLoading(true);
            var rest = await axios.post(path, body, config);
            setIsLoading(false);

            if (rest.data.isError) {

                setModalData({ "title": "Signin Error", "message": rest.data.errorMessage, "isShowImg": true, "showImageType": "alert" })
                setIsShowModal(true)

                return;
            }

            setModalData({ "title": "Signin Error", "message": rest.data.errorMessage, "isShowImg": true, "showImageType": "correct" })
            setIsShowModal(true)
        }
        catch {

            setModalData({ "title": "Signin Error", "message": rest.data.errorMessage, "isShowImg": true, "showImageType": "error" })
            setIsShowModal(true)
        }

    }

    return (
        <React.Fragment>
            {
                isLoading ? <LoadingScreen />
                    :
                    <React.Fragment>
                        <div className='login-form-container'>
                            <div className='title-signin'>
                                <p>Sign-In</p>
                            </div>
                            <div className='input-username-container'>
                                <p id='input-label'>Username : </p>
                                <input className='signin-input' type='text' value={username} onChange={handleUsernameChange} />
                            </div>
                            <div className='input-password-container'>
                                <p id='input-label'>Password : </p>
                                <input className='signin-input' type='password' value={password} onChange={handlePasswordChange} />
                            </div>
                            <div className='button-container'>
                                <button id='button-signin' onClick={userSignIn}>Sign In</button>
                                <button id='button-signin' onClick={() => navigate(-1)}>Cancel</button>
                            </div>

                            <div className='no-account'>
                                <a>Don't have an account ? &nbsp;</a>
                                <a>Signup now</a>
                            </div>
                        </div>
                        {isShowModal && <ModalBase closeModal={() => setIsShowModal(false)} data={modalData} />}
                    </React.Fragment>

            }
        </React.Fragment>
    )
}

export default SignIn;