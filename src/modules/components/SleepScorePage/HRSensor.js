import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorLight ={
  color: '#3cc7c3',
  fontSize: 50,
}

const HRSensor = (props) => {
  return (
    <Row> {/* Centre */}
        <div className="textsize">
          <h1><span>Heart rate </span><span className="middlesize"  style={colorLight}>{props.value} bpm</span></h1>
        </div>
    </Row>
      );
    }
    
    export default HRSensor;