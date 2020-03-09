import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

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
const SleepScore = (props) => {
  return (
    <div className="textcenter">
    <Container className="themed-container" fluid={true}>
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>Sleep Score</h1>
            </div>
            <h1 style={colorLight}>98</h1>
            <h1 style={colorfont}>Is'<span style={colorLightNR}>6</span> point higher than yesterday</h1>
        </Col>
      </Row>
    </Container>
    </div>
      );
    }
    
    export default SleepScore;