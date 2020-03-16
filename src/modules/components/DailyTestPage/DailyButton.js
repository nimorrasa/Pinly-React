import React, { useState, useCallback, useEffect } from 'react';
import './text.css';
import './formbtn.css';

import { Container, Row, Col } from 'reactstrap';

var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 25
}
var colorfont ={
  fontSize: 30
}
var ButtonSize ={
    width: "50%",
    height: "50%",
    padding: 0,
    
    
  }
const DailyButton = (props) => {

	const [count,setCount] = useState(0);

	const increment = useCallback(
		() => {
			setCount(count + 1)
		},
		[count]
	) 
	const decrement = useCallback(
		() => {
			setCount(count - 1)
		},
		[count]
	) 
	const reset = useCallback(
		() => {
			setCount(count - 1)
		},
		[count]
	)

	useEffect(
		() => {
			props.register({ name: props.name });
		},
		[props.register]
	);

	useEffect(
		() => {
			props.setValue( props.name, count);
		},
		[count]
	)
  
	return (
		<Row style={{textAlign: "center"}}>
            <Col lg="12" md="12" xs="12">
                <button type="button" className ="btn btn-link" onClick={increment}><img src={props.image} alt={`${props.title} Button Counter`} style={ButtonSize} ></img></button>
                <h1 style={colorfont}>{props.title} <span style={colorLightNR}>(1-10 {props.unit})</span> : {count} 
                <button type="button" className="btn btn-link"onClick={reset}> <span style={colorLightNR}>Reset</span> </button></h1>
            </Col>
		</Row>
	
	);
  }

export default DailyButton ;