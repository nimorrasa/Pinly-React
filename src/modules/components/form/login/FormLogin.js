import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import './FormLogin.css';
import { Container, Row, Col, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import LoginEmail  from './form/LoginEmail.js';
import SocialRegister  from './form/SocialRegister.js';
import { useCookies } from 'react-cookie';

const FormLogin = (props) => {
	const firebase = props.firebase;
	const history = useHistory();
	const [userId, setUserId] = useState('');
	const [isRedirect,setIsRedirect] = useState(false);

	firebase.auth().getRedirectResult().then(function(result) {
		if(result.user != null) {
			setUserId(result.user.uid);
			setIsRedirect(true);
		}

	});
	const [cookies, setCookie] = useCookies();


	const [userData,setUserData] = useState({
		email : '',
		username : '',
		bdate : '',
		bmonth : '',
		byear : '',
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
			} catch(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Email :' + errorMessage);
			}
		}else if(result.type == 'facebook') {
			alert("handle Facebook");
			try{
				const response = await firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
				login_userId = response.user.uid;
				setUserId(login_userId);
			} catch(error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Facebook : '+errorMessage);
			}
		}else if(result.type == 'google') {
			alert('Handle Google')
			try {
				let google_provider = new firebase.auth.GoogleAuthProvider();
				const response = await firebase.auth().signInWithRedirect(google_provider);
				login_userId = response.user.uid;
				// alert(login_userId);
				setUserId(login_userId);
			} catch (error) {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Google : ' + errorMessage);
			}
		}
	},[]);

	async function fetchData() {
		if(userId.length > 0) {
			let user = await firebase.database().ref('/users/' + userId).once('value');
			alert("Fetch User Data");
			if(user.val() != null) {
				return user.val();
			}
		}
		return null;
	}

	useEffect(() => {
		let data = fetchData();
		if(data != null) {
			alert('Found User' + data.email);
			props.onLogin(data.uid);
			setCookie('token', data.uid);
		}else if(isRedirect){
			setStep('login_with_social');
		}
	},[setUserId]);

	
	const handleRegister = useCallback(async (user) => {
		let array_birthdate = user.birthdate.substring(0, 10).split('-');
		let newBirthdate = array_birthdate[2]+'-'+array_birthdate[1]+'-'+array_birthdate[0];
		let current_userid = firebase.auth().currentUser.uid;
		console.log(current_userid);
		const posts = {
			uid: current_userid,
			email: user.username,
			username: user.username,
			gender: user.gender,
			weight: user.weight,
			height: user.height,
			birthdate: newBirthdate,
			disease: user.disease
		};
		console.log(posts);
		const database = await firebase.database();
		const usersRef = await database.ref('/users');
		const response = await usersRef.child(current_userid).set(posts);
		setUserData(posts);
	},[]);

	if(step == 'login_with_email') return <LoginEmail onResult={handleResult} onChangeStep={handleStep}></LoginEmail>;
	return <SocialRegister userId={userId} onSuccess={handleRegister} onChangeStep={handleStep}></SocialRegister>;

	};

export default FormLogin;