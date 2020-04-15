import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import './FormLogin.css';
import { useHistory } from "react-router-dom";
import LoginEmail  from './form/LoginEmail.js';
import SocialRegister  from './form/SocialRegister.js';
import { useCookies } from 'react-cookie';
import { createMacAddress } from '../../../helpers';
import firebase from 'firebase';

const FormLogin = (props) => {
	const history = useHistory();
	// const [isLoading,setIsLoading] = useState(true);
	const [cookies, setCookie] = useCookies();
	const [userId, setUserId] = useState('');

	const [userData,setUserData] = useState({
		email : '',
		username : '',
		mac_address : '',
		weight : '',
		height : '',
		gender : '',
		disease : ''
	});

	const [step,setStep] = useState('login_with_email');

	const handleStep = useCallback((step) => {
		props.setIsLoading(true);
		setStep(step);
		props.onChangeStep(step);
		props.setIsLoading(false);
	});

  	const handleResult = useCallback( async (result) => {
		let login_userId = null;
		props.setIsLoading(true);
		if(result.type == 'login_with_email') {
			try {
				const response = await firebase.auth().signInWithEmailAndPassword(result.email, result.password);
				login_userId = response.user.uid;
				setUserId(login_userId);
				// history.push('/sleep_score');
			} catch(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Email :' + errorMessage);
			}
		}else if(result.type == 'facebook') {
			alert("Alert "+result.type); 
			try{
				const response = await firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
				// login_userId = response.user.uid;
				// setUserId(login_userId);
			} catch(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Facebook : '+errorMessage);
			}
		}else if(result.type == 'google') {
			alert("Alert "+result.type); 
			try {
				let google_provider = new firebase.auth.GoogleAuthProvider();
				const response = await firebase.auth().signInWithRedirect(google_provider);
				// login_userId = response.user.uid;
				// setUserId(login_userId);
			} catch (error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Google : ' + errorMessage);
			}
		}
		props.setIsLoading(false);

	},[]);

	useEffect(() => {
		async function fetchData (user_id) {
			let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
		}

		async function isRedirect () {
			props.setIsLoading(true);
			let redirectResult = await firebase.auth().getRedirectResult();

			if(redirectResult.operationType == 'signIn'){
				console.log('signIn',redirectResult.user.uid);
				setStep('login_with_social');

				let get_user_data = await fetchData(redirectResult.user.uid);
				if(get_user_data == null) {

					alert("login_with_social"); 
				}else{
					setUserData(get_user_data);
					alert("go sleep_score"); 
					// history.push('/sleep_score');
				}
				setUserId(redirectResult.user.uid);
			}
			props.setIsLoading(false);
			console.log('Not signIn',redirectResult);
			alert("Not signIn"); 
		}
		isRedirect();
	},[]);

	const handleRegister = useCallback(async (user) => {
		let newBirthdate = user.birthdate;
		let current_userid = firebase.auth().currentUser.uid;

		let birthdate = new Date(newBirthdate);
		let byear = birthdate.getFullYear();

		const posts = {
			uid: current_userid,
			email: user.username,
			username: user.username,
			gender: user.gender,
			weight: user.weight,
			height: user.height,
			birthdate: newBirthdate,
			byear : byear,
			mac_address : user.mac_address,
			disease: user.disease
		};
		const database = await firebase.database();
		const usersRef = await database.ref('/users');
		const response = await usersRef.child(current_userid).set(posts);
		const res = await createMacAddress(posts.uid, posts.mac_address);
		setUserData(posts);
		history.push('/sleep_score');
	},[]);

	if(step == 'login_with_email') return <LoginEmail onResult={handleResult} onChangeStep={handleStep} style={{display: (props.isLoading ? "hide" : 'block')}}></LoginEmail>;
	return <SocialRegister isLoading={props.isLoading} setIsLoading={props.setIsLoading} userId={userId} onSuccess={handleRegister} onChangeStep={handleStep}></SocialRegister>;

	};

export default FormLogin;