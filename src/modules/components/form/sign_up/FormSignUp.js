import React, { useState, useCallback } from "react";
import './FormSignUp.css';
import SignUp1  from './form/SignUp1.js';
import SignUp2  from './form/SignUp2.js';
// import { useForm } from "react-hook-form";

const FormSignUp = (props) => {
  const firebase = props.firebase;
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

    firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password).then(function(result) {

			const userId = result.user.uid;

			const email = registerData.email;
      const username = registerData.username;
      const password = registerData.password;
			const gender = registerData.gender;
			const weight = registerData.weight;
			const height = registerData.height;
			const disease = registerData.disease;
			const bdate = registerData.bdate;
			const bmonth = registerData.bmonth;
			const byear = registerData.byear;
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