import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import './FormSignUp.css';
import { Container, Row, Col } from "reactstrap";
import DatePicker from 'reactstrap-date-picker';

const FormSignUp = (props) => {
  const [step,setStep] = useState('sign_up_step_1');
  const { handleSubmit, register, errors } = useForm();

  

  const nextStep = useCallback(() => {
    setStep('sign_up_step_2');
  },[setStep]);


  const onSubmit = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row className={step}>
          <Col className='sign_up_1' xs='12'>
            <Row id="username"> 
            <Col xs='12'>
              <p class="m-0">Username</p>
              <input
                type="text"
                name="username"
                placeholder="username"
                required/>
            </Col>
          </Row>
          <Row id="email"> 
            <Col xs='12'>
              <p class="m-0">Email</p>
              <input
                type="email"
                name="email"
                placeholder="email"
                required/>
            </Col>
          </Row>
          <Row>
            <Col id="password" xs='6'>
            <p class="m-0">Password</p>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required/>
            </Col>
            <Col id="confirm_password" xs='6'>
            <p class="m-0">Confirm Password</p>
            <input
              type="password"
              name=""
              placeholder="password"
              required/>
            </Col>
          </Row>
          <Row>
            <Col xs='12'>
              <button type="button" onClick={nextStep}>Continue</button>
            </Col>
          </Row>
          </Col>
          <Col className='sign_up_2' xs='12'>
          <Row id="gender"> 
            <Col xs='12'>
              <p class="m-0">Gender</p>
              <select name="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Col>
          </Row>
          <Row id="weight"> 
            <Col xs='12'>
              <p class="m-0">Weight</p>
              <input
                type="number"
                name="weight"
                placeholder="weight"
                required/>
            </Col>
          </Row>
          <Row>
            <Col id="height" xs='6'>
            <p class="m-0">Height</p>
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              required/>
            </Col>
            <Col id="confirm_password" xs='6'>
            <p class="m-0">Congenital disease</p>
            <input
              type="disease"
              name="disease"
              placeholder="Congenital disease"
              required/>
            </Col>
          </Row>
          <Row>
            <Col xs='12'>
              <button type="submit" onClick={onSubmit}>Submit</button>
            </Col>
          </Row>
          </Col>
        </Row>
      </Container>
    

    </form>
  );
};

export default FormSignUp;