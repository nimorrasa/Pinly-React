import React, { useState, useEffect } from "react";
import './text.css';
import './formbtn.css';
import "./progress-bar.css";
import { Container, Row, Col } from 'reactstrap';

const Range = props => {
	return (
		// render current the filled range of progress bar along its width
		<div className="range" style={{ width: `${props.percentRange}%` }} />
	);
};

const ProgressBar = props => {
	return (
		<div className="progress-bar">
			{/*render available progress bar’s limit*/}
			<Range percentRange={props.percentRange} />
		</div>
	);
};

function EffectedFn() {
	const [loading, setLoading] = useState(true);

	useEffect(
		() => {
			setTimeout(
				() => {
					setLoading(false);
				},
				24
			);
		}
	);

	return (
		<div>
			{loading && <span>Loading...</span>}
			{!loading && <span>All Done!</span>}
		</div>
	);
}

export const TapBar = (props) => {
	const [percentRange, setProgress] = useState(0);

	useEffect(
		() => {
			props.register({ name: props.name });
		},
		[props.register]
	);

	useEffect(
		() => {
			props.setValue(props.name, percentRange);
		},
		[percentRange]
	)


	return (
		<div>
			<h1 style={{fontSize: "5ex",textAlign: "center"}}>{percentRange == 500 ? `500 Mins ! Too Much!!` : `${props.title} :  ${percentRange} Mins`}</h1>
			<div className="positionbar">
				<ProgressBar percentRange={percentRange}/>
			</div>
			<div className="toggle-buttons button" style={{textAlign: "center"}}>
				<button style={{fontSize: "3ex"}} disabled={percentRange==0} type="button" className="btn btn-link" onClick={() => setProgress(percentRange < 500 ? percentRange - 10 : 500) }><h1>-</h1></button>
				<button style={{fontSize: "3ex"}} type="button" className="btn btn-link" onClick={() => setProgress(percentRange < 500 ? percentRange + 10 : 500) }><h1>+</h1></button>
				<button style={{fontSize: "3ex"}} type="button" className="btn btn-link" onClick={() => setProgress(0)}><span>Reset</span></button>
			</div>
		</div>
	);
};

export default TapBar;