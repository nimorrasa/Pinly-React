import React, { useState, useCallback } from "react";
import './FormSignUp.css';
import SignUp1  from './form/SignUp1.js';
import SignUp2  from './form/SignUp2.js';
import { useHistory } from "react-router-dom";
import { createMacAddress } from '../../../helpers';
import firebase from 'firebase';

const FormSignUp = (props) => {
  const history = useHistory();
  const [userData,setUserData] = useState({
    email : '',
    username : '',
    password : '',
    birthdate : '',
    mac_address : '',
    weight : '',
    height : '',
    gender : '',
    disease : ''
  });

  const [step,setStep] = useState('sign_up_step_1');


  const handleStep = useCallback((step) => {
    setStep(step);
    props.onStepChange(step);
  });

  const handleStep1 = useCallback((newData) => {
    let newBirthdate = newData.birthdate;
    setUserData({
      email : newData.email,
      username : newData.username,
      password : newData.password,
      birthdate :newBirthdate,
      mac_address : newData.mac_address,
      weight : userData.weight,
      height : userData.height,
      gender : userData.gender,
      disease : userData.disease
    });
  });

  const handleSubmit = useCallback(async (newData) => {
    let registerData = {
      email : userData.email,
      username : userData.username,
      password : userData.password,
      birthdate :userData.birthdate,
      mac_address : userData.mac_address,
      weight : newData.weight,
      height : newData.height,
      gender : newData.gender,
      disease : newData.disease
    };
    setUserData(registerData);

    let userId = '';
    try { 
      let result = await firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password);
      userId = result.user.uid;
      await createMacAddress(userId, registerData.mac_address);
    } catch(error) {
      alert(error);
    }

			const email = registerData.email;
      const username = registerData.username;
			const gender = registerData.gender;
			const weight = registerData.weight;
			const height = registerData.height;
			const disease = registerData.disease;
      const birthdate = registerData.birthdate;
      const mac_address = registerData.mac_address;

      let birthdate_data = new Date(birthdate);
      let byear = birthdate_data.getFullYear();
      
			const posts = {
				uid: userId,
				email: email,
        username: username,
				gender: gender,
				weight: weight,
				height: height,
        birthdate: birthdate,
        byear : byear,
        mac_address : mac_address,
				disease: disease
			};

      registerData.userId = userId;

      try {
        const database = await firebase.database();
        const result = await database.ref('/users').child(userId).set(posts);
				alert('Success');	  
				localStorage.setItem("uid", userId);
      } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
		  }

      let user = await firebase.database().ref('/users/' + userId).once('value');
      if(user.val() != null) {
        props.onSubmit(registerData);
        history.push('/profile');
      }
      else{
        setStep('login_with_email');
      }
  });

  if(step === 'sign_up_step_1') return <SignUp1 onSuccess={handleStep1} onChangeStep={handleStep}></SignUp1>
  return <SignUp2 onSuccess={handleSubmit} onChangeStep={handleStep}></SignUp2>
};

export default FormSignUp;