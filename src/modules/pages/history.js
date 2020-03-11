import React from 'react';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import TableHistory from '../components/History/TableHistory.js'
import { useCookies } from 'react-cookie';

var colorheader ={
  color: '#ffffff',
  padding: 20
}


const history = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);

  return (
    <div className="textcenter">
    <Container className="themed-container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>History</h1>
            </div>
        </Col>
      </Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
      <Row justify-content-md-center><TableHistory/></Row>
    </Container>
    </div>
      );
    }
    
    export default history;