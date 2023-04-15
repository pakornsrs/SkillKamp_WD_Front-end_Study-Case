import React, { constant } from 'react';
import '../../css/ButtonPannal.css'

const ButtonPannal = (props) => {

    return (
        <React.Fragment>
            <div className='button-pannal-container'>
                <button className='button-left' onClick={props.leftFunc}>{props.left}</button>
                <button className='button-right' onClick={props.rightFunc}>{props.right}</button>
            </div>
        </React.Fragment>
    )
}

export default ButtonPannal;