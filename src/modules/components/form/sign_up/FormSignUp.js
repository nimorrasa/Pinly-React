import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import './FormSignUp.css';
import { Container, Row, Col } from "reactstrap";

const FormSignUp = (props) => {
  const [passwordShow,setPasswordShow] = useState(false);
  const [step,setStep] = useState('sign_up_step_1');
  const { handleSubmit, register, errors } = useForm();

  
  let togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
  const nextStep = useCallback(() => { setStep('sign_up_step_2'); },[setStep]);
  const backStep = useCallback(() => { setStep('sign_up_step_1'); },[setStep]);


  const onSubmit = values => {
    console.log(values);
  };


  const dates = []

  for (let i=1; i<=31; i++) {
    dates.push(i)
  }

  const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]

  const years = []

  for (let i=2020; i>=1999; i--) {
    years.push(i)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Row className={step}>
          <Col className='sign_up_1' xs='12'>
            <Row id="username"> 
            <Col xs='6'>
              <p class="m-0">Username</p>
              <input
                type="text"
                name="username"
                placeholder="username"
                required/>
            </Col>
          </Row>
          <Row id="email"> 
            <Col xs='6'>
              <p class="m-0">Email</p>
              <input
                type="email"
                name="email"
                placeholder="email"
                required/>
            </Col>
          </Row>
          <Row>
            <Col id="password" lg='5' xs='6' style={{paddingRight: "0"}}>
            <p class="m-0">Password</p>
            <input
              type={!passwordShow ? 'password' : 'text'}
              name="password"
              id="password"
              placeholder="password"
              required/>
            </Col>
            <Col id="password" lg='1' xs='1' style={{paddingLeft: "2px", top: "2px"}}>
            <p class="m-0" style={{color: "transparent"}}>Password</p>
            <span className={"fa fa-fw fa-eye field-icon toggle-password"} onClick={togglePassword}></span>
            </Col>
            <Col id="confirm_password" lg='5' xs='6'>
            <p class="m-0">Confirm Password</p>
            <input
              type={!passwordShow ? 'password' : 'text'}
              name=""
              placeholder="Confirm password"
              required/>
            </Col>
          </Row>
          <Row> 
            <Col id="bdate" lg='2' xs='2'>
              <p class="m-0">Birthdate</p>
              <select value='1' name="bdate" min='12' max='31'required>
                {dates.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
            </Col>
            <Col id="mdate" lg='3' xs='4'>
              <p class="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select value='1' name="bmonth" min='12' max='31'required>
                {months.map((value, index) => {
                  return <option key={index+1}>{value}</option>;
                })}
              </select>
            </Col>
            <Col id="ydate" lg='3' xs='4'>
              <p class="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select value='1' name="byear" min='12' max='31'required>
                {years.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
              </Col>
          </Row>
          <Row>
            <Col className="button" lg='3' xs='3'>
              <button type="button" onClick={nextStep}>Continue</button>
            </Col>
          </Row>
          </Col>
          <Col className='sign_up_2' xs='12'>
          <Row> 
            <Col id="gender" lg='2' xs='3'>
              <p class="m-0">Gender</p>
              <select name="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Col>
            <Col id="weight" lg='3' xs='4'>
              <p class="m-0">Weight</p>
              <input
                type="number"
                name="weight"
                placeholder="weight"
                required/>
            </Col>
            <Col id="height" lg='3' xs='4'>
            <p class="m-0">Height</p>
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              required/>
            </Col>
          </Row>
          <Row>
            <Col id="disease" xs='4'>
            <p class="m-0">Congenital disease</p>
            <input
              type="disease"
              name="disease"
              placeholder="Congenital disease"
              required/>
            </Col>
          </Row>
          <Row>
            <Col className="button" lg='3' xs='3'>
              <button type="submit" onClick={backStep}>Back</button>
            </Col>
            <Col className="button" lg='3' xs='3'>
              <button type="submit" onClick={onSubmit}>Submit</button>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    

    </form>
  );
};

export default FormSignUp;