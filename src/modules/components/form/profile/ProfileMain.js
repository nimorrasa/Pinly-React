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

	if(step === 'view_profile') return <ProfileDetail userData={userData} onChangeStep={handleStep}></ProfileDetail>
	return <ProfileForm userData={userData} onChangeStep={handleStep}></ProfileForm>
};

export default ProfileMain;