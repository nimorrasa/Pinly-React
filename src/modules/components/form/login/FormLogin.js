import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import './FormLogin.css';
import { Container, Row, Col } from "reactstrap";
import LoginEmail  from './form/LoginEmail.js';
import SocialRegister  from './form/SocialRegister.js';

const FormLogin = (props) => {
  const [step,setStep] = useState('login_with_email');

  const handleStep = useCallback((step) => {
    setStep(step);
    props.onChangeStep(step);
  });

  if(step == 'login_with_email') return <LoginEmail  onChangeStep={handleStep}></LoginEmail>;
  return <SocialRegister  onChangeStep={handleStep}></SocialRegister>;

};

export default FormLogin;