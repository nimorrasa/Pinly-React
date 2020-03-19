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
	const [isLoading,setIsLoading] = useState(true);
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
		setStep(step);
		props.onChangeStep(step);
	});

  	const handleResult = useCallback( async (result) => {
		let login_userId = null;
		if(result.type == 'login_with_email') {
			try {
				const response = await firebase.auth().signInWithEmailAndPassword(result.email, result.password);
				login_userId = response.user.uid;
				setUserId(login_userId);
				history.push('/home');
			} catch(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Email :' + errorMessage);
			}
		}else if(result.type == 'facebook') {
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

	},[]);

	useEffect(() => {
		async function fetchData (user_id) {
			let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
		}

		async function isRedirect () {
			let redirectResult = await firebase.auth().getRedirectResult();
			console.log("Redirect :",redirectResult);
			if(redirectResult.operationType == 'signIn'){
				let get_user_data = await fetchData(redirectResult.user.uid);
				if(get_user_data == null) {
					setStep('login_with_social');
				}else{
					setUserData(get_user_data);
					history.push('/profile');
				}
				setUserId(redirectResult.user.uid);
			}
		}
		props.setIsLoading(true);
		isRedirect();
		props.setIsLoading(false);
		setIsLoading(false);
	},[]);

	const handleRegister = useCallback(async (user) => {
		setIsLoading(true);
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
		history.push('/profile');
	},[]);

	if(step == 'login_with_email') return <LoginEmail onResult={handleResult} onChangeStep={handleStep} style={{display: (isLoading ? "hide" : 'block')}}></LoginEmail>;
	return <SocialRegister userId={userId} onSuccess={handleRegister} onChangeStep={handleStep}></SocialRegister>;

	};

export default FormLogin;