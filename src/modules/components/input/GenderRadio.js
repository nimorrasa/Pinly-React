import React, { useState, useCallback } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';

const GenderRadio = (props) => {
  const [gender,setGender] = useState('');

  const handleGenderChange = useCallback((event) => { setGender(event.target.value)},[setGender])

  return (
    <Row>
        <Col id="gender" lg='12' md="12" xs='12'>
            <input
                style={{margin: "10px"}}
                name="is_male"
                type="radio"
                label="gender"
                onChange={handleGenderChange}
                checked={gender === 'Male'}
                value='Male'
                ref={props.register()}/>
                Male
            <input
                style={{margin: "10px"}}
                name="is_female"
                type="radio"
                label="gender"
                onChange={handleGenderChange}
                checked={gender === 'Female'}
                value='Female'
                ref={props.register()}/>
                Female
        </Col>
    </Row>
  );
}

export default GenderRadio;
