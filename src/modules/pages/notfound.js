import React from 'react';
import './components/text.css';
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
            <h1 style={colorLight}>404 NOT FOUND</h1>
            <h1 style={colorfont}>PAGE NOT FOUND : Please Reload Web To pinly.org</h1>
            <br></br><br></br> <br></br><br></br> <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </Col>
      </Row>
    </Container>
    </div>
      );
    }
    
    export default SleepScore;