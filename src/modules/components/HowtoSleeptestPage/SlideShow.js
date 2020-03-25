import React from 'react';
import { Slide } from 'react-slideshow-image';
import './layout.css'

import pic1 from './img_usesleeptest/1.png';
import pic2 from'./img_usesleeptest/2.png';
import pic3 from'./img_usesleeptest/3.png';
import pic4 from'./img_usesleeptest/4.png';


const slideImages = [ {pic1},{pic2},{pic3},{pic4},];
 
const properties = {
  autoplay: false,
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

 
const Slideshow = () => {
  
    return (

      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            <img src={pic1} className="layout" alt="Button Go To Sleep _Daily Test"/>
            </div>
          </div>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <img src={pic2}  className="layout" alt="Button Go To Sleep _Daily Test"/>
            </div>
          </div>
 
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <img src={pic3} className="layout"  alt="Button Go To Sleep _Daily Test"/>
          </div>
        </div>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[3]})`}}>
            <img src={pic4}  className="layout" alt="Button Go To Sleep _Daily Test"/>
            </div>
          </div>
          
          
        </Slide>
        </div>
    )
}

export default Slideshow;