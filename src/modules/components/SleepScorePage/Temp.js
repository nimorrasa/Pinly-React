import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorheader ={
  color: '#ffffff',
  padding: 20
}
var colorLight ={
  color: '#3cc7c3',
  fontSize: 80,
}
var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 50,
}
var colorfont ={
  color: '#ffffff',
  fontSize: 50
}
const Temp = (props) => {
  return (
    <div className="textcenter">
    <Container className="themed-container" fluid={true}>
        <Row> {/* Centre */}
            <div className="textsize">
            <h1 style={colorheader}>Temperature</h1>
            </div>
            <h1 style={colorLight}>27 C</h1>
      </Row>
    </Container>
    </div>
      );
    }
    
    export default Temp;