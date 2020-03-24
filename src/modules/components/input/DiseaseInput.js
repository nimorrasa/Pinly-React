import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import Select from 'react-select'
import '../form/sign_up/FormSignUp.css';

const DiseaseInput = (props) => {
	
	const [disease,setDisease] = useState(setoption(props.value && props.value.split(',')));

	const diseases = [
		'Insomnia',
		'Insufficient sleep syndrome',
		'Insomnia secondary to medical problems',
		'Central origin of hypersomnolence',
		'Circadian rhythm disorder',
		'Parasomnia',
		'Sleep related breathing disorder',
		'Sleep related movement disorder',
		'Idiopathic insomnia',
		'None'
	];

	function setoption(diseases) {
		if(diseases == undefined) return [];
		let optionData = [];
		for (const disease_data of diseases) {
		  optionData.push({ value: disease_data, label: disease_data });
		}
		return optionData;
	  }

	  useEffect(() => {
		props.register({ name: "disease" });
	  }, [props.register]);

	useEffect(() => {
		if(props.getValues && props.getValues().disease){
			console.log(props.getValues().disease);
			setDisease(props.getValues().disease.split(","));
		}
		props.setValue('disease', props.value);
	}, [props.getValues])


	  const handleChange = useCallback(
		value => {
		  props.setValue("disease", value);
		  setDisease(value);
		},
		[]
	  );
	
	return (
		<Row> 
			<Col id="disease" lg='10' md="10" xs='10'>
			<p className="m-0">Congenital disease</p>
			<Select
				defaultValue={disease}
				isMulti
				name="disease"
				options={setoption(diseases)}
				className="basic-multi-select"
				classNamePrefix="select"

				name="disease"
				// min='1'
				// max='31'

				// options={diseases}
				// value=
				onChange={handleChange}
				>
			</Select>
			</Col>
		</Row>
	);
}

export default DiseaseInput;
