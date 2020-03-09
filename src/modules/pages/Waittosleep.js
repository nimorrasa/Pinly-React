import React from 'react';
import './components/text.css';
import { Container, Row, Col } from 'reactstrap';
import IconWaittosleep from './components/WaittoSleepPage/ic_waitsleep.png'
import './App.css';

var colorheader ={
  color: '#ffffff',
  padding: 20
}
var colorLight ={
  color: '#3cc7c3',
  fontSize: 200
}
var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 30
}
var colorfont ={
  color: '#ffffff',
  fontSize: 30
}
const Waittosleep = (props) => {
  return (
    <div className="Bg-color">
    
    <a href ="./Wakeup"> <div className="align-items-center">
    <div className="textcenter">
        <a href="Wakeup" target="Wakeup"><img src={IconWaittosleep} alt="Icon Wait to Sleep"></img></a>
            <div className="textsize">
            <h1 style={colorheader}>Please close your phone's screen.</h1>
            <h1 style={colorheader}>So the system can better measure and assess the quality og your sleep.</h1>
            </div>
    </div>
    </div></a>
    
    </div>
      );
    }
    
    export default Waittosleep;