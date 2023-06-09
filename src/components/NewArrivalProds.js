import React from 'react';
import ProdCard from './ProdCard';
import '../css/NewArrivalProds.css';

const NewArrivalProds =(props)=>{

    return(
        <div className='new-arrival-container'>
            <p id='new-arrival-header'>New Arrival</p>
            <div className='gallery'>
                <ProdCard selectedProduct = {props.selectedProduct}/>
            </div>

        </div>
    )
}

export default NewArrivalProds;