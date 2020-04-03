import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorLight ={
  color: '#3cc7c3',
  fontSize: 50,
}
const Temp = (props) => {
  return (
      <Row style={{width: "20vw"}}> {/* Centre */}
            <div className="textsize">
            <h1>Temperature<span className="middlesize" style={colorLight}>{props.value}  ํC</span></h1>
            </div>
            
      </Row>
      );
    }
    
    export default Temp;