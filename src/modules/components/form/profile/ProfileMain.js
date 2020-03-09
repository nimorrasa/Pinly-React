import React, { useState, useCallback } from "react";
import './FormProfile.css';
import ProfileDetail  from './ProfileDetail.js';
import ProfileForm  from './ProfileForm.js';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';

const ProfileMain = (props) => {
  const history = useHistory();
  const [ userData, setUserData ] = useState({});
  const [step,setStep] = useState('view_profile');

  const handleStep = useCallback((step) => {
    setStep(step);
    props.onStepChange(step);
  });

  const handleSubmit = useCallback(async (newData) => {
    let registerData = {
      email : userData.email,
      username : userData.username,
      password : userData.password,
      birthdate :userData.birthdate,
      macAddress : userData.macAddress,
      bdate : userData.bdate,
      bmonth : userData.bmonth,
      byear : userData.byear,
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
    } catch(error) {
      alert(error);
    }

			const email = registerData.email;
      const username = registerData.username;
      const password = registerData.password;
			const gender = registerData.gender;
			const weight = registerData.weight;
			const height = registerData.height;
			const disease = registerData.disease;
      const birthdate = registerData.birthdate;
      const macAddress = registerData.macAddress;

			const posts = {
				uid: userId,
				email: email,
        username: username,
        password : password,
				gender: gender,
				weight: weight,
				height: height,
        birthdate: birthdate,
        mac_address : macAddress,
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

  if(step === 'view_profile') return <ProfileDetail onChangeStep={handleStep}></ProfileDetail>
  return <ProfileForm onSuccess={handleSubmit} onChangeStep={handleStep}></ProfileForm>
};

export default ProfileMain;