import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import './FormLogin.css';
import { Container, Row, Col } from "reactstrap";
import MyLink from "../../MyLink.js";
import facebook_logo from '../../../../images/facebook-512.png';
import google_logo from '../../../../images/google-plus-512.png';

const FormLogin = (props) => {
  const [passwordShow,setPasswordShow] = useState(false);
  const [step,setStep] = useState('login_with_email');
  const { handleSubmit, register, errors } = useForm();

  
  let togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
  const handleSocial = useCallback(() => { setStep('login_with_social'); },[setStep]);
  const backStep = useCallback(() => { setStep('login_with_email'); },[setStep]);

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
      <Row className={step}>
      <Col className="login" lg='12' xs='12'>
        <Row>
          <Col lg='12' xs='12'>
          <Row id="email"> 
            <Col lg='8' xs='8' style={{paddingRight: "0"}}>
              <p class="m-0">Email</p>
              <input
                type="email"
                name="email"
                placeholder="email"
                required/>
            </Col>
          </Row>
          <Row>
            <Col id="password" lg='8' xs='8' style={{paddingRight: "0"}}>
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
          </Row>
          </Col>
        </Row>
        <Row style={{padding: "0"}}>
          <Col lg='4' xs='4'>
            <p><input type="checkbox" name="" style={{width: "10px"}}/> Remember Me</p>
          </Col>
          <Col lg='1' xs='1'>
          </Col>
          <Col lg='5' xs='5' >
            <MyLink destination='?forgot_password' text='Forgot Password?'></MyLink>
          </Col>
        </Row>
        <Row>
          <Col className="button" lg='5' xs='5'>
          </Col>
          <Col className="button" lg='3' xs='3' style={{paddingRight: "0"}}>
              <button type="submit" onClick={onSubmit}>Login</button>
          </Col>
        </Row>
        <Row style={{paddingTop: "10%"}}>
          <Col lg='3' xs='3'>
            <p>Or login with </p>
          </Col>
          <Col lg='2' xs='2'>
            <button className="my-button" onClick={handleSocial}><img id="facebook_login" src={facebook_logo} width="50" height="50" alt=""/></button>
          </Col>
          <Col lg='2' xs='2'>
            <button className="my-button" onClick={handleSocial}><img id="google_login" src={google_logo} width="50" height="50" alt=""/></button>
          </Col>
        </Row>
        </Col>
        <Col className='social_login' xs='12'>
          <Row id="username"> 
            <Col lg='6' md='6' xs='6'>
              <p class="m-0">Username</p>
              <input
                type="text"
                name="username"
                placeholder="username"
                required/>
            </Col>
          </Row>
          <Row> 
            <Col id="bdate" lg='3' md='4' xs='4'>
              <p class="m-0">Birthdate</p>
              <select value='1' name="bdate" min='12' max='31'required>
                {dates.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
            </Col>
            <Col id="mdate" lg='3' md='4' xs='4'>
              <p class="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select value='1' name="bmonth" min='12' max='31'required>
                {months.map((value, index) => {
                  return <option key={index+1}>{value}</option>;
                })}
              </select>
            </Col>
            <Col id="ydate" lg='3' md='4' xs='4'>
              <p class="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select value='1' name="byear" min='12' max='31'required>
                {years.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
              </Col>
          </Row>
          <Row> 
            <Col id="gender" lg='2' md='4' xs='4'>
              <p class="m-0">Gender</p>
              <select name="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Col>
            <Col id="weight" lg='3' md='4' xs='4'>
              <p class="m-0">Weight</p>
              <input
                type="number"
                name="weight"
                placeholder="weight"
                required/>
            </Col>
            <Col id="height" lg='3' md='4' xs='4'>
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
            <Col id="disease" lg='6' md='6' xs='6'>
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
    

    </form>
  );
};

export default FormLogin;