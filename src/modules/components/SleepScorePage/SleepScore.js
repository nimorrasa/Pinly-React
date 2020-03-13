import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorheader ={
  padding: 20
}
var colorLight ={
  color: '#3cc7c3',
  fontSize: "10rem"
}
var colorLightNR ={
  color: '#3cc7c3',
  // fontSize: "3rem"
}
var colorfont ={
  // fontSize: "3rem"
}
const SleepScore = (props) => {
  return (
    <Row>
      <Col>
          <div className="textsize">
          <h1 style={colorheader}>Sleep Score</h1>
          </div>
          <h1 style={colorLight}>98</h1>
          <h1 style={colorfont}>Is'<span style={colorLightNR}>6</span> point higher than yesterday</h1>
      </Col>
    </Row>
      );
    }
    
    export default SleepScore;