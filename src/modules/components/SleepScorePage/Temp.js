import React from 'react';
import './text.css';
import { Container, Row, Col } from 'reactstrap';

var colorLight ={
  color: '#3cc7c3',
  fontSize: 50,
}
const Temp = (props) => {
  return (
    <div className="textsize">
    <h1 className="middlesize">Temperature<span style={colorLight}>{props.value}  ํC</span></h1>
    </div>
      );
    }
    
    export default Temp;