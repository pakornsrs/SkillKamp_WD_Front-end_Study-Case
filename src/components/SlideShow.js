import React, { useState, useEffect  } from 'react';
import '../css/SlideShow.css';
import Banner1 from '../Assets/Banner/Banner1.png'
import Banner2 from '../Assets/Banner/Banner2.png'
import Banner3 from '../Assets/Banner/Banner3.png'


const SlideShow = () =>{

    const imgs = new Array(Banner1,Banner2,Banner3);
    const [imageUrl, setImageUrl] = useState(imgs[0]);
    const [activeButtons, setActiveButtons] = useState(0);
    const [activeSlides, activeActiveSlides] = useState(0);
    const buttonValues = new Array();

    for(let i = 0; i < imgs.length; i++){
        buttonValues.push(i);
    }

    const SlideBtnClick = (value) => {
        setImageUrl(imgs[value]);

        setActiveButtons(value);
        activeActiveSlides(value)
    };

    let count = 0

    useEffect(() => {
        const interval = setInterval(() => {
            count = (count + 1) % imgs.length;
            
            setImageUrl(imgs[count])
            setActiveButtons(count);
            activeActiveSlides(count)

        }, 5000);
        return () => clearInterval(interval);
      }, [imageUrl]);



    return(

        <div className='img-slider'>
            {buttonValues.map((value) => (
                    <div
                        key={value}
                        className={`slide ${activeSlides === value ? 'active' : ''}`}>
                            <img src={imageUrl} className='img-slide'/>
                    </div>
                ))}
            <div className='navigation'>
                {buttonValues.map((value) => (
                    <div
                        key={value}
                        className={`btn ${activeButtons === value ? 'active' : ''}`}
                        onClick={() => SlideBtnClick(value)}>
                    </div>
                ))}
            
            </div>
        </div>

    );
}

export default SlideShow;