import React from 'react';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import IconWaittosleep from '../../images/icon/ic_waitsleep.png'
import '../css/App.css';

var colorheader ={
  color: '#ffffff',
  padding: 20
}
const Waittosleep = (props) => {
  return (
    <div className="Bg-color">
    
    <a href ="wake_up"> <div className="align-items-center">
    <div className="textcenter">
        <img src={IconWaittosleep} alt="Icon Wait to Sleep"></img>
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