import React from 'react';
import '../../css/LoadingScreen.css'

const LoadingScreen =()=>{
    
    return(
        <div className='loader-container'>
            <div className='loader'>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <div className='loader--dot'></div>
                <p className='loader--text'></p>
            </div>
        </div>
    )
}

export default LoadingScreen;