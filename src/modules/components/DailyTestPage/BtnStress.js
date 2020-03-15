import React, { useState, useCallback, useEffect } from 'react';
import './text.css';
import './formbtn.css';
import Btn_str from './btn_tea.png';

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
const BtnStress = (props) => {

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
			props.register({ name: "stress" });
		},
		[props.register]
	);

	useEffect(
		() => {
			props.setValue('stress', count);
		},
		[count]
	)
  
	return (
		<div className="container">
			<button type="button" className ="btn btn-link" onClick={increment}><img src={Btn_str} alt="Caffeine Button Counter " style={ButtonSize} ></img></button>
			{/* <button className="button_storke" onClick={decrement}>-</button>*/}
			
			<h1 style={colorfont}> Tea <span style={colorLightNR}>(1-10 Levels)</span> : {count} 
			<button type="button" className="btn btn-link"onClick={reset}> <span style={colorLightNR}>Reset</span> </button></h1>
		</div>
	
	);
  }

export default BtnStress ;