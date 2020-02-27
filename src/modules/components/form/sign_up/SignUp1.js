import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator";
import './FormSignUp.css';

const SignUp1 = (props) => {
    const { handleSubmit, register, errors } = useForm();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");


  const [step,setStep] = useState('sign_up_step_1');
  
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const [birthMonth, setBirthMonth] = useState("");
  const [birthMonthError, setBirthMonthError] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthYearError, setBirthYearError] = useState("");

  const [passwordShow,setPasswordShow] = useState(false);

  const togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
    max: 15
  });
  useEffect(
    () => {
      if (!email) {
        setEmailError("");
      } else {
        if (validateEmail(email)) {
          setEmailError("");
        } else {
          setEmailError("Please enter a valid email.");
        }
      }
    },
    [email]
  );

  useEffect(
    () => {
      if (!confirmPassword || !password) {
        setConfirmPasswordError("");
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("The passwords must match.");
        } else {
          setConfirmPasswordError("");
        }
      }
    },
    [password, confirmPassword]
  );

  const nextStep = useCallback((data) => {
    
    console.log(data.target); 
    alert('ddd');
    // setUserData({
    //   username : data.username,
    //   email : data.email,
    //   birthdate : data.bdate+'-'+data.bmonth+'-'+data.byear,
    //   gender : userData.gender,
    //   weight : userData.weight,
    //   height : userData.height
    // });
    // setStep('sign_up_step_2');
    // props.onStepChange('sign_up_step_2');
  },[setStep]);


  const diseases = ['None',
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
  'Other'];

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
    <div>
      <form onSubmit={handleSubmit(nextStep)}>
          <Col className='sign_up_1' xs='12'>
            <Row id="username"> 
            <Col xs='6'>
              <p className="m-0">Username</p>
              <input
                type="email"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="username"
                required/>
                <div className="error">{usernameError}</div>
            </Col>
          </Row>
          <Row id="email"> 
            <Col xs='6'>
              <p className="m-0">Email</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required/>
                <div className="error">{emailError}</div>
            </Col>
          </Row>
          <Row>
            <Col id="password" lg='5' xs='6' style={{paddingRight: "0"}}>
            <p className="m-0">Password</p>
            <input
              type={!passwordShow ? 'password' : 'text'}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              placeholder="password"
              required/>
              <div className="error">{confirmPasswordError}</div>
            </Col>
            <Col id="password" lg='1' xs='1' style={{paddingLeft: "2px", top: "2px"}}>
            <p className="m-0" style={{color: "transparent"}}>Password</p>
            <span className={"fa fa-fw fa-eye field-icon toggle-password"} onClick={togglePassword}></span>
            </Col>
            <Col id="confirm_password" lg='5' xs='6'>
            <p className="m-0">Confirm Password</p>
            <input
              type={!passwordShow ? 'password' : 'text'}
              name=""
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required/>
              <div className="error">{confirmPasswordError}</div>
            </Col>
          </Row>
          <Row> 
            <Col id="bdate" lg='2' xs='2'>
              <p className="m-0">Birthdate</p>
              <select
                defaultValue='1'
                name="bdate"
                min='1'
                max='31'
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                required>
                {dates.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
              <div className="error">{birthDateError}</div>
            </Col>
            <Col id="mdate" lg='3' xs='4'>
              <p className="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select
                defaultValue='1'
                name="bmonth"
                value={birthMonth}
                onChange={e => setBirthMonth(e.target.value)}
                min='12'
                max='31'
                required>
                {months.map((value, index) => {
                  return <option key={index+1}>{value}</option>;
                })}
              </select>
              <div className="error">{birthMonthError}</div>
            </Col>
            <Col id="ydate" lg='3' xs='4'>
              <p className="m-0" style={{color: "transparent"}}>Birthdate</p>
              <select
                defaultValue='1'
                name="byear"
                value={birthYear}
                onChange={e => setBirthYear(e.target.value)}
                min='12'
                max='31'
                required>
                {years.map((value, index) => {
                  return <option key={value}>{value}</option>;
                })}
              </select>
              <div className="error">{birthYearError}</div>
              </Col>
          </Row>
          <Row>
            <Col className="button" lg='3' xs='3'>
              <button type="submit">Next</button>
            </Col>
          </Row>
          </Col>
      </form>
    </div>
  );
}
export default SignUp1;