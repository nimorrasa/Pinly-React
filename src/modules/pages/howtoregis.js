import React from 'react';
import './components/text.css';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import CarouselHowtoRsg from './components/HowtoregisterPage/SlideShow'
var colorheader ={
  color: '#ffffff',
  padding: 20
}


const Help = (props) => {
  return (
    <div className=".Bg-color">
    <div className="textcenter">
    <Container className="themed-container" fluid={true}>
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>HOW TO REGISTER</h1>
            </div>
            <CarouselHowtoRsg/>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
      );
    }
    
    export default Help;