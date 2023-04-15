import React, { constant } from 'react';
import '../../css/OneButton.css'

const OneButton = (props) => {

    return (
        <React.Fragment>
            <div className='button-pannal-container'>
                <button className='button-center' onClick={props.centerFunc}>{props.center}</button>
            </div>
        </React.Fragment>
    )
}

export default OneButton;