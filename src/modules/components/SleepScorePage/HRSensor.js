import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorLight ={
  color: '#3cc7c3',
  fontSize: 50,
}

const HRSensor = (props) => {
  return (
    <div className="textsize">
      <h1 className="middlesize" ><span>Heart rate </span><span style={colorLight}>{props.value} bpm</span></h1>
    </div>
      );
    }
    
    export default HRSensor;