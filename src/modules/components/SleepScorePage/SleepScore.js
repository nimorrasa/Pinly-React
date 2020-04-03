import React, { useState, useEffect } from 'react';
import './text.css';
import { Tooltip, Row, Col } from 'reactstrap';

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactTooltip from "react-tooltip";



var colorheader ={
	padding: 20
}
var colorLight ={
	color: '#3cc7c3'
}
var colorLightNR ={
	color: '#3cc7c3',
	// fontSize: "3rem"
}
var colorfont ={
	// fontSize: "3rem"
}

const SleepScore = (props) => {
	const [sleepScoreToday,setSleepScoreToday] = useState(props.sleepScoreToday);
	const [sleepScoreYesterday,setSleepScoreYesterday] = useState(props.sleepScoreYesterday);
	const [diff,setDiff] = useState(0);

	useEffect(
		() => {
			setSleepScoreToday(props.sleepScoreToday);
			setSleepScoreYesterday(props.sleepScoreYesterday);
			setDiff(props.sleepScoreToday - props.sleepScoreYesterday);
		},
		[props.sleepScoreToday,props.sleepScoreYesterday]
	)


	function getTooltipMessage(point) {
			if( point <= 30 ) {
				return <h3>0-30 = Must see a doctor.</h3>
			}
			if( point <= 50 ){
				return <h3>31-50 = Fair, should have more sleep discipline or consult a doctor.</h3>
				
			 }
			 if( point <= 60){
				return <h3>51-60 = moderate, should get enough rest.</h3>
			
			}
			if( point <= 89 ){
				return <h3>61-89 = Good, Improved sleep performance, as determined by the Assistant in the system.</h3>
			}
			return <h3>90-100 = Excellent , keep it up!</h3>
	}
	
	return (
		<Row>
			<Col style={{textAlign: "center",display: "relative"}}>
				<div className="textsize">
				<h1 style={colorheader}>Sleep Score</h1>
				</div>
				<Row data-tip data-for="happyFace">
					<Col lg="6" md="6" xs="6" style={{textAlign: "right"}}>
						<h1 class="oversize" style={colorLight}>{sleepScoreToday}</h1>
					</Col>
					<Col lg="6" md="6" xs="6" style={{textAlign: "left",paddingTop: "10%"}}>
						<h1 style={{padding: 0,margin: 0}}><FontAwesomeIcon style={{color : (diff >= 0 ? "rgb(60, 199, 195)" : "red")}} icon={diff >= 0 ? faCaretUp : faCaretDown}></FontAwesomeIcon>{(sleepScoreYesterday == 0 ? sleepScoreToday : Math.abs(diff))}%</h1> 
					</Col>
				</Row>
                <ReactTooltip id="happyFace">
                  {getTooltipMessage(sleepScoreToday)}
                </ReactTooltip>
				<Row>
					<h1 style={colorfont}>Is'<span style={colorLightNR}>{Math.abs(diff)}</span> point {diff >= 0 ? 'higher' : 'lower' } than yesterday</h1>
				</Row>	
			</Col>
		</Row>
	);
}

export default SleepScore;