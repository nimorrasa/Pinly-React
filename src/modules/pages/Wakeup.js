import React from 'react';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';

import './SleepSc';

var colorheader ={
  color: '#ffffff',
  padding: 20
}

const Wakeup = (props) => {
  return (
    <div className="Bg-color">
    <div className="textcenter">
    <a href="/sleep_score"><Container className="themed-container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>Please touch "anywhere".</h1>
            <h1 style={colorheader}>To see results And assessing your sleep.</h1>
            <br></br></div>
        </Col>
      </Row>
    </Container></a>
    </div>
    </div>
      );
    }
    
    export default Wakeup;