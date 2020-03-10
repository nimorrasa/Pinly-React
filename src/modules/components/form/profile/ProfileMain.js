import React, { useState, useCallback, useEffect } from "react";
import './FormProfile.css';
import ProfileDetail  from './ProfileDetail.js';
import ProfileForm  from './ProfileForm.js';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';

const ProfileMain = (props) => {
	const history = useHistory();
	const [ userData, setUserData ] = useState({});
	const [step,setStep] = useState('view_profile');

	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function fetchData (user_id) {
			let user = await firebase.database().ref('/users/' + user_id).once('value');
			// if(user.val() == null) return null;
			return user.val();
		}
	
		firebase.auth().onAuthStateChanged(async function(user) {
		if (user) {
			let data = await fetchData(user.uid);
				setUserData(data);
			}else{
					history.push('/login');
			}
			setIsLoading(false);
		});
	

	},[firebase]);


	const handleStep = useCallback((step) => {
		setStep(step);
		// props.onStepChange(step);
	});

	const handleSubmit = useCallback(async (newData) => {
		const userId = userData.uid;
		const weight = newData.weight;
		const height = newData.height;
		const disease = newData.disease;
		const birthdate = newData.birthdate;
		const mac_address = newData.mac_address;
		
		let registerData = {
		  uid : userId,
		  email : userData.email,
		  username : userData.username,
		  birthdate :birthdate,
		  mac_address : mac_address,
		  weight : weight,
		  height : height,
		  gender : userData.gender,
		  disease : disease
		};
		setUserData(registerData);
	
		try {
			const database = await firebase.database();
			const result = await database.ref('/users').child(userId).set(registerData);
			alert('Success');	  
			localStorage.setItem("uid", userId);
		} catch(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		}
	  });

	if(step === 'view_profile') return <ProfileDetail userData={userData} onChangeStep={handleStep}></ProfileDetail>
	return <ProfileForm userData={userData} onSuccess={handleSubmit} onChangeStep={handleStep}></ProfileForm>
};

export default ProfileMain;