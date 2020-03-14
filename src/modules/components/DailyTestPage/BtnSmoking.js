import React, { useCallback, useState, useEffect} from 'react';
import './text.css';
import './formbtn.css';

import Btn_smk from './btn_smk.png';

var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 25
}
var colorfont ={
  fontSize: 30
}
var ButtonSize ={
    width: "50%",
    padding: 0,
    
    
  }
const BtnSmoking = (props) => {

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
			props.register({ name: "smoking" });
		},
		[props.register]
	);

	useEffect(
		() => {
			props.setValue('smoking', count);
		},
		[count]
	)
	
	return (
		<div className="container">

			<button type="button" className ="btn btn-link" onClick={increment}><img src={Btn_smk} alt="Caffeine Button Counter " style={ButtonSize} ></img></button>
			{/* <button className="button_storke" onClick={decrement}>-</button>*/}
			

			<h1 style={colorfont}> Smoking <span style={colorLightNR}>(roll)</span> : {count}
			<button type="button" className="btn btn-link"onClick={reset}> <span style={colorLightNR}>Reset</span> </button></h1>
			
			
		</div>
	)
}

    export default BtnSmoking;