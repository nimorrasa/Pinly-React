import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorheader ={
  padding: 20
}
var colorLight ={
  color: '#3cc7c3',
  fontSize: 80,
}

const HRSensor = (props) => {
  return (
    <Row> {/* Centre */}
        <div className="textsize">
        <h1 style={colorheader}>Heart rate</h1>
        </div>
        <h1 className="middlesize"  style={colorLight}>{props.value} bpm</h1>
    </Row>
      );
    }
    
    export default HRSensor;