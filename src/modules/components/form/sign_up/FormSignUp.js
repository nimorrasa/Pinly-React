import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import './FormSignUp.css';
import { Form, Row, Col } from "reactstrap";
import Firebase from '../../../firebase/Firebase.js';
import SignUp1  from './SignUp1.js';
import SignUp2  from './SignUp2.js';

const FormSignUp = (props) => {
  const [step,setStep] = useState('sign_up_step_1');

  const handleStep = useCallback((step) => {
    setStep(step);
    props.onStepChange(step);
  });

  if(step === 'sign_up_step_1') return <SignUp1 onChangeStep={handleStep}></SignUp1>
  return <SignUp2 onChangeStep={handleStep}></SignUp2>
};

export default FormSignUp;