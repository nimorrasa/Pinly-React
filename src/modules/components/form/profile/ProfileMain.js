import React, { useState, useCallback, useEffect } from "react";
import './FormProfile.css';
import ProfileDetail  from './ProfileDetail.js';
import ProfileForm  from './ProfileForm.js';
import { useHistory } from "react-router-dom";
import { updateMacAddress } from '../../../helpers';
import firebase from 'firebase';
import { diseaseValueData } from '../../../helpers';

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
				// console.log(user.email);
				let data = await fetchData(user.uid);
				if(!data) data = {uid: user.uid,email : user.email,username: user.email, gender: "Male"};
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
		const userId = userData && userData.uid;
		const weight = newData && newData.weight;
		const height = newData && newData.height;
		const disease = diseaseValueData(newData && newData.disease);
		const birthdate = newData && newData.birthdate;
		const mac_address = newData && newData.mac_address;

		let byear = birthdate.getFullYear();
		
		let registerData = {
		  uid : userId,
		  email : userData && userData.email,
		  username : userData && userData.username,
		  birthdate :birthdate.toString(),
		  byear : byear,
		  mac_address : mac_address,
		  weight : weight,
		  height : height,
		  gender : userData && userData.gender,
		  disease : disease,
		  sleep_status : 2
		};
		setUserData(registerData);
	
		try {
			const database = await firebase.database();
			const result = await database.ref('/users').child(userId).set(registerData);
			const res = await updateMacAddress(registerData.uid, registerData.mac_address);
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