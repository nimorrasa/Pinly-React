import React, { useState, useCallback } from "react";
import './FormSignUp.css';
import firebaseConfig from '../../../firebase/firebaseConfig.js';
import firebase from 'firebase';
import 'firebase/auth';

import SignUp1  from './form/SignUp1.js';
import SignUp2  from './form/SignUp2.js';
// import { useForm } from "react-hook-form";

const FormSignUp = (props) => {
  const [isSuccess,setIsSuccess] = useState(false);
  const [userData,setUserData] = useState({
    email : '',
    username : '',
    password : '',
    bdate : '',
    bmonth : '',
    byear : '',
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
    setUserData({
      email : newData.email,
      username : newData.username,
      password : newData.password,
      bdate : newData.bdate,
      bmonth : newData.bmonth,
      byear : newData.byear,
      weight : userData.weight,
      height : userData.height,
      gender : userData.gender,
      disease : userData.disease
    });
  });

  const handleSubmit = useCallback((newData) => {
    let registerData = {
      email : userData.email,
      username : userData.username,
      password : userData.password,
      bdate : userData.bdate,
      bmonth : userData.bmonth,
      byear : userData.byear,
      weight : newData.weight,
      height : newData.height,
      gender : newData.gender,
      disease : newData.disease
    };
    setUserData(registerData);
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(function(result) {

			const userId = result.user.uid;

			const email = userData.email;
      const username = userData.username;
      const password = userData.password;
			const gender = userData.gender;
			const weight = userData.weight;
			const height = userData.height;
			const disease = userData.disease;
			const bdate = userData.bdate;
			const bmonth = userData.bmonth;
			const byear = userData.byear;
			const birthdate = bdate+"-"+bmonth+"-"+byear;

			const posts = {
				uid: userId,
				email: email,
        username: username,
        password : password,
				gender: gender,
				weight: weight,
				height: height,
				birthdate: birthdate,
				disease: disease
			};

			const database = firebase.database();
			const usersRef = database.ref('/users');
			usersRef.child(userId).set(posts).then(function(result) {
				alert('Success');	  
				localStorage.setItem("uid", userId);
				
			});
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		});
		// });

    props.onSubmit(registerData);
  });

  if(step === 'sign_up_step_1') return <SignUp1 onSuccess={handleStep1} onChangeStep={handleStep}></SignUp1>
  return <SignUp2 onSuccess={handleSubmit} onChangeStep={handleStep}></SignUp2>
};

export default FormSignUp;