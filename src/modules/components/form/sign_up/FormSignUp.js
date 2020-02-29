import React, { useState, useCallback } from "react";
import './FormSignUp.css';
import Firebase from '../../../firebase/Firebase.js';
import SignUp1  from './form/SignUp1.js';
import SignUp2  from './form/SignUp2.js';
// import { useForm } from "react-hook-form";

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