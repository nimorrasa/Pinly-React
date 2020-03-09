import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';

const DiseaseInput = (props) => {
	const [disease,setDisease] = useState('');

	const diseases = [
		'None',
		'Insomnia',
		'snoring',
		'sleep Apnea',
		'Parasomnia',
		'sleep related breathing disorder',
		'sleep related movement disorder',
		'Central origin hypersomnolence',
		'Circadien rhythm disorder',
		'Narcolepsy',
		'Migraine',
		'Other'
	];

	useEffect(() => {
		props.setValue('disease', props.value);
	  }, [])
	

	return (
		<Row> 
			<Col id="disease" lg='6' md="6" xs='10'>
			<p className="m-0">Congenital disease</p>
			<select
				// defaultValue={disease}
				name="disease"
				min='1'
				max='31'
				// value=
				onChange={e => setDisease(e.target.value)}
				ref={props.register({required: 'Required'})}
				>
				{diseases.map((value, index) => {
				return <option key={index}>{value}</option>;
				})}
			</select>
			</Col>
		</Row>
	);
}

export default DiseaseInput;
