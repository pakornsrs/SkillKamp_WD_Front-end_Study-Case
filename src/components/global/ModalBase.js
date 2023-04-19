import React, { useEffect, useState } from 'react';
import '../../css/ModalBase.css'
import { Close } from '@carbon/icons-react';
import AlertImg from '../../Assets/Response/alert.png'
import InfoImg from '../../Assets/Response/info.png'
import CorrectImg from '../../Assets/Response/correct.png'
import ErrorImg from '../../Assets/Response/error.png'

const ModalBase = (props) => {

  const [isShowImg, setIsShowImg] = useState("none");
  const [imgPath, setImgPath] = useState("");

  useEffect(() => {

    // set img
    if (props.data.isShowImg === true) {

      switch (props.data.showImageType) {
        case "alert":
          setImgPath(AlertImg)
          break;
        case "info":
          setImgPath(InfoImg)
          break;
        case "correct":
          setImgPath(CorrectImg)
          break;
        case "error":
          setImgPath(ErrorImg)
          break;
        default:
          setImgPath("")

      }
    }
    else {
      setImgPath("");
    }

  }, []);

  const handleClick = () => {
    props.closeModal(false)
  }

  return (
    <div className="modal-container">
      <div onClick={handleClick} className="overlay"></div>
      <div className="modal-content">

        <div className='modal-title'>
          <p>{props.data.title}</p>
        </div>
        <div className='modal-message'>
          <img className='modal-image' src={imgPath} />
          <p>{props.data.message}</p>
        </div>

        <button className="close-modal" onClick={handleClick}>
          <Close id='close-btn' size="32" />
        </button>
        <button className="close-modal-ok" onClick={handleClick}>OK</button>
      </div>
    </div>
  );
}

export default ModalBase;
