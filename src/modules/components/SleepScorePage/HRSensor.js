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
    <div className="textcenter">
    <Container className="themed-container" fluid="true">
        <Row> {/* Centre */}
            <div className="textsize">
            <h1 style={colorheader}>Heart rate</h1>
            </div>
            <h1 style={colorLight}>55 bpm</h1>
      </Row>
    </Container>
    </div>
      );
    }
    
    export default HRSensor;