import React, { useState } from "react";
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

  return (
        <Row> 
        <Col id="disease" lg='4' xs='4'>
        <p className="m-0">Congenital disease</p>
        <select
            defaultValue='1'
            name="disease"
            min='1'
            max='31'
            value={disease}
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
